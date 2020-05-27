import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import UserConsumer from "../context";
import posed from 'react-pose';
import axios from "axios";
import {Link} from "react-router-dom"
import ChartUsers from './ChartUsers'
import ReactTooltip from "react-tooltip";

const AnimationUser = posed.div({
    visible : {
        opacity:1,
    },
    hidden : {
       opacity:0,
       
   }

});


class User extends Component {

    
 //State oluşturmanın 1. yolu
    //---------------------------
    // constructor(props){
    //  super(props);
     
    //  this.state = {
    //      isVisible : true
    //  }
    // }

    //State oluşturmanın 2. yolu
    state = {
        isVisible : false
    }

    static defaultProps = {
        id : "No information",
        name: "No information",
        department: "No information",
        salary: "No information",
        performanceArray:[],
        
    }

    

    //Bind etmenin diğer 1. yolu
    //---------------------------
     // onClickEvent(e){
     //    console.log(this);  
     // }
     //Aşağıda da onClick = {this.onClickEvent.bind(this)} demek.


    //Bind etmenin diğer 2. yolu
    //---------------------------
    //constructor(props){
        //super(props);
       // this.onClickEvent = this.onClickEvent.bind(this);
    //}

    //Bind etmenin diğer 3. yolu (Error function olarak yazman)
    //---------------------------
    onClickEvent = (e) =>{
        //State true is false yap,false ise true yap dedik. State'i bu şekil ayarlarız.
        this.setState({
            isVisible : !this.state.isVisible
        })
       
     }

    //gönderiler değerler burda ilk yazılır.
    onDeleteUser = async (dispatch,e) =>{
        const {id} = this.props;
        console.log("This is delete");
        localStorage.setItem('renderChartJs',JSON.stringify(true));
        //Delete Request
        await axios.delete(`http://localhost:3004/users/${id}`) // ( `` ) Template Literals: Alt Gr + iki virgül. Bir dize oluşturmanın yeni yolu.
                                     
        dispatch({
            type:"DELETE_USER", 
            payload:id
        })
    }

    
    render() {
        //const performanceArray = []
        const {id,name,department,salary,performanceArray} = this.props
        const {isVisible} = this.state
        
        return (
          <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    
                   
                    return (
     
                        <div className = "col-md-12 mb-4" style={{cursor : "pointer"}}>    {/*Kullanıcı görünür ise renklendir. Dynamic css*/}
                            
                            <div className = "card" style = {isVisible ? {backgroundColor : "#FCFCFC"} : null}>               
                               
                                 <div className="card-header d-flex justify-content-between">
                                     <h4 className = "d-inline" onClick = {this.onClickEvent.bind(this,34)}>{name}</h4>
                                     <FontAwesomeIcon data-tip data-for="registerTip" icon={faTrashAlt} style={{cursor : "pointer"}} onClick = {this.onDeleteUser.bind(this,dispatch)}/>
                                     <ReactTooltip id="registerTip" place="top" effect="solid">
                                          Delete User
                                     </ReactTooltip>
                                 </div>
                                 <AnimationUser pose = {isVisible ? "visible" : "hidden"}>
                                 {
                                     isVisible ? <div className = "card-body">
                                     <div className="row">    
                                      <div className="col">   
                                            &nbsp; 
                                            <p className = "card-text"> Department : {department}</p>
                                            <p className = "card-text"> Salary : {salary}</p>                           
                                            
                                        </div>
                                        <div className="col-8 mb-3"> 
                                            <ChartUsers dataArray = {performanceArray} />
                                        </div>
                                    </div>
                                     <Link to = {`update/${id}`} className = "btn btn-primary float-right shadow-sm rounded mb-3">Update</Link>
                                    </div> : null
                                 }
                                </AnimationUser>
                            </div> 
                           
                        </div>
                    )

                }
            }
          </UserConsumer>
        )
    }
}

User.propTypes = {
    id : PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    performanceArray: PropTypes.array.isRequired,
}

//Bu yukarda static şekliyle de oluşabilir
// User.defaultProps = {
//     name: "Bilgi Yok",
//     department: "Bilgi Yok",
//     salary: "Bilgi Yok"
// }
export default User;
