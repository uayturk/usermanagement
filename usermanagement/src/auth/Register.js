import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from "axios";



class Register extends Component {

    state = {
       visible : false,
       email : "",
       password: "",
       error : false,
    }

    changeVisibility = (e) =>{
    
        this.setState({
            visible : !this.state.visible
        })
        
    }

    registerUser = async (dispatch,e) =>{
          e.preventDefault() //Sayfa otomatik yenileniyor.Formun default davranışıdır bu. Bunu engelledik en başta bu fonksiyonla.
         
          const{email,password} = this.state //Daha yazarken yukardaki state'in içine gittiği için,direk yazılan değerler böyle ulaşırız.
          
        

          const newRegisteredUser = {
            email,
            password
          }  

          if(!this.validateForm()){
              this.setState({
                  error : true
              })
              return; //alttaki işlemlere geçmesin diye return ile sonlanmalı
          }


          const response = await axios.post("http://localhost:3001/auth",newRegisteredUser);
          
          dispatch({
              type : "REGISTER_USER",
              payLoad : response.data
          });

          //Redirect işlemi
          this.props.history.push("/");
         
    }

    changeInput = (e) =>{
      this.setState({
          
          //[e.target.name] burdaki name; name = "name" , name = "department" , name = "salary" ifadesidir.
          [e.target.name] :e.target.value // formun içine girilen değeri aldı, value = {name},{department} ve ya {salary} 
                              //dendiği için name inputunda otomatik olarak setledi.
          
        })
        
        
    }


    validateForm = () => {
        const {email,password} = this.state;

        if(email === "" || password === ""){
            return false;
        }else
            return true;
    }

    render() {

        const {email,password,error} = this.state;
        

        return(
            <UserConsumer>
                {
                    value => {
                           const {dispatch} = value;
                            // col d-block eklemek açılınca sidebar sağa yaslı şekilde soldan küçülmeyi sağladı.
                            return (
                                <div className = "col d-block col-md-12 mb-4">
                                    
                                   {/* <button onClick = {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>*/}
                                   {/* <Animation pose = {visible ? "visible" : "hidden"}>*/}
                                        <div className = "card">
                                            <div className = "card-header">
                                                <h4>User Register Form</h4>
                                            </div> 
                                            
                                            <div className = "card-body">
                                                {
                                                    error ? <div className = "alert alert-danger">
                                                        Please check you informations.
                                                    </div> : null
                                                }
                                                <form onSubmit = {this.registerUser.bind(this,dispatch)}>
                                                    <div className = "form-group">
                                                        <label htmlFor = "name">Email</label>
                                                        <input 
                                                        type = "text"
                                                        name = "email"
                                                        id = "id"
                                                        placeholder = "Enter Your Email"
                                                        className = "form-control"
                                                        value = {email}
                                                        onChange = {this.changeInput}
                                                        />
                                                    </div>

                                                    <div className = "form-group">
                                                        <label htmlFor = "password">Password</label>
                                                        <input 
                                                        type = "text"
                                                        name = "password"
                                                        id = "id"
                                                        placeholder = "Enter Your Password"
                                                        className = "form-control"
                                                        value = {password}
                                                        onChange = {this.changeInput}
                                                        />
                                                    </div>                                                                                                                                    

                                                    <button className = "btn btn-success btn-block" type = "submit"> Register User</button>

                                                </form>
                                            </div>          
                                        </div>                           
                                    {/*</Animation>*/}
                                </div>
                            )
                        }
                }
            </UserConsumer>
        )



       
    }
}
export default Register;
















