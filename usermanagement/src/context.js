import React, { Component } from 'react';
import axios from "axios";

//Bu alttaki bize bir tane Provider,bir tane de Consumer verecek.
const UserContext = React.createContext();

const reducer = (state,action) =>{
    switch(action.type){
        case "DELETE_USER":
            return {
                //...state Spred Operatördür, expressionların, fonksiyonlarda birden fazla parametre olarak kullanılmasına,
                // arraylerin içerisinde birden fazla eleman olarak genişletilmesine, yayılmasına olanak sağlar.
               //eski state'i spread oparator ile ayırarak aldık.Eski değerleri kaybetmemek adına.
               //Yani '...state' olan yerde eski state var. Spread operator'un daha bir çok özelliği vardır.
                ...state,          //her userda gezin   //action.payload içinde id gönderildi  //ve bu id,üzerinde gezindiğimiz user'ın id'si eşit olmadığı sürece listede tutcaz,eşit olursa silcez
               users: state.users.filter(user => action.payload !== user.id) //yani eşit olmayanları filtrele tut demek.
            }
        case "ADD_USER":
        
            return {
               ...state,
               users : [...state.users,action.payLoad] // ...state.users ---> Listenin eski hali + action.payload (yeni user) 
            }
        case "UPDATE_USER":
        
                return {
                   ...state, //ilk olarak eski state'i döndük ...state diyerek.
                   users : state.users.map( //users'ın üzerinde map ile geziniyoruz
                       user => user.id === action.payLoad.id ? action.payLoad : user //user => user.id  herbir user (user) => user.id o user'ın id'si
                       //Şu an üzerinde bulunduğumuz id ( user.id ) ,bize gönderilen güncellenmiş user'ın id'si ( action.payLoad.id ) ile eşitse
                       //bu user'ı artık güncellenmiş user yap, değilse (:) bu user böyle kalsın.
                    ) 
                   
                }   
        case "REGISTER_USER":
            return {
               ...state,
               auths : [...state.auths,action.payLoad] // ...state.users ---> Listenin eski hali + action.payload (yeni user) 
            }
        default:
            return state
    }
}

export class UserProvider extends Component {

    state = {
        users: [
       
        ],
        auths: [
       
        ],
        dispatch : action => { //güncellenmemiş state,yapılacak olan action
            
            this.setState(state => reducer(state,action))
                      //state'e eriştik
        }
     }

    componentDidMount = async () => { //ES6 ile gelen yapıdır async .İşlemleri kolaylaştırır.
                                      // async diyerek asenkron çalış dedik,await ile de bekledik.
                                      // kısacası bu yapıda await denilen kısmın işi tam bitmeden devam edilmiyor.
       const response = await axios.get("http://localhost:3004/users");
       const responseAuth = await axios.get("http://localhost:3001/auths");
      
       this.setState({
           users : response.data,
           auths : responseAuth.data
       })
    }

    render() {
        //{this.props.children} aslında App componenti simgeler ve React tarafından otomatik gönderilern bir propstur.
        return (
           <UserContext.Provider value = {this.state}>
               {this.props.children}
           </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;