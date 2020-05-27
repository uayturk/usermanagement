import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from "axios";
import validator from 'validator';

var uniqid = require('uniqid');


class UpdateUser extends Component {
    

    state = {
       name : "",
       department: "",
       salary: "",
       performanceJan:"",
       performanceFeb:"",
       performanceMar:"",
       performanceApr:"",
       performanceMay:"",
       performanceJun:"",
       performanceJul:"",
       performanceAug:"",
       performanceSept:"",
       performanceOct:"",
       performanceNov:"",
       performanceDec:"",
       performanceArray:[],
       error : false,
       errorNumber:false,
       errorRange:false
    }
    
    componentDidMount = async () => { //Api isteği yapmamız gerek. Bunu componentDidmount'ta yapardık.
        const {id} = this.props.match.params; //id'si tıklanan user'ın id'si alınmalı.
        
        const response = await axios.get(`http://localhost:3004/users/${id}`);

        const {name,department,salary,
            performanceArray } = response.data;
            
        // value = {name} ,value = {department} ,.. diyerek value'ya direk bu state'leri bağlamıştık.
        // yani şimdi burda state'leri değiştirdiğimiz zaman, direk olarak inputlara önceki bilgiler gelecek.
        this.setState({
            name,
            department,
            salary,
            performanceJan:performanceArray[0],
            performanceFeb:performanceArray[1],
            performanceMar:performanceArray[2],
            performanceApr:performanceArray[3],
            performanceMay:performanceArray[4],
            performanceJun:performanceArray[5],
            performanceJul:performanceArray[6],
            performanceAug:performanceArray[7],
            performanceSept:performanceArray[8],
            performanceOct:performanceArray[9],
            performanceNov:performanceArray[10],
            performanceDec:performanceArray[11],
            performanceArray
        })
    }


    updateUser = async (dispatch,e) =>{
        e.preventDefault()

        const {id} = this.props.match.params;
        const {name,department,salary,performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,
            performanceArray } = this.state;

            if(performanceArray.length === 12){
                performanceArray.length = 0;
            }

            performanceArray.push(performanceJan,performanceFeb,performanceMar,
                performanceApr,performanceMay,performanceJun,
                performanceJul,performanceAug,performanceSept,
                performanceOct,performanceNov,performanceDec);

        const updateUser = {    
            name,  
            department,
            salary,
            performanceArray
        }
                                                          
       
        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return;
        }

        const response = await axios.put(`http://localhost:3004/users/${id}`,updateUser);
          
        dispatch({
              type : "UPDATE_USER",
              payLoad : response.data
        })
        localStorage.setItem('renderChartJs',JSON.stringify(true));
           //Redirect işlemi
           this.props.history.push("/home")
         
        }

    changeInput = (e) =>{

        const currencyValue = e.target.value;

        if(e.target.name === 'performanceJan' || e.target.name === 'performanceFeb' || e.target.name === 'performanceMar' || e.target.name === 'performanceApr' ||
           e.target.name === 'performanceMay' || e.target.name === 'performanceJun' || e.target.name === 'performanceJul' || e.target.name === 'performanceAug' ||
           e.target.name === 'performanceSept' || e.target.name === 'performanceOct' || e.target.name === 'performanceNov' || e.target.name === 'performanceDec') {
            
            if(!validator.isInt(currencyValue)) {
                this.setState({
                    errorNumber : true
                })
              
            }else if(validator.isInt(currencyValue)) {
                this.setState({
                    errorNumber : false
                })
                if(currencyValue<0 || currencyValue>100){
                    
                    this.setState({
                        errorRange : true
                    })
                }else{
                    this.setState({
                        errorRange : false
                    })  
                }
                
            }
        }

      this.setState({
          //[e.target.name] burdaki name; name = "name" , name = "department" , name = "salary" ifadesidir.
          [e.target.name] :e.target.value // formun içine girilen değeri aldı, value = {name},{department} ve ya {salary} 
                              //dendiği için name inputunda otomatik olarak setledi.
      })
        
    }

    validateForm = () => {
        const {name,salary,department,performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,performanceArray} = this.state;
            
        if(name === "" || department === "" || salary === "" || 
        performanceJan === "" || performanceFeb === "" || performanceMar === "" ||
        performanceApr === "" || performanceMay === "" || performanceJun === "" ||
        performanceJul === "" || performanceAug === "" || performanceSept === ""||
        performanceOct === "" || performanceNov === "" || performanceDec === "", performanceArray === []){
            return false;
        }else
            return true;
    }
    render() {

        const {visible,name,salary,department,performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,
            performanceArray,error,errorNumber,errorRange} = this.state;
            

        return(
            <UserConsumer>
                {
                    value => {
                           const {dispatch} = value;
 
                            return (
                                <div className = "col d-block col-md-12 mb-4">                                                                                                 
                                        <div className = "card">
                                            <div className = "card-header">
                                                <h4>Update User Form</h4>
                                            </div> 
                                            <div className = "card-body">
                                               {
                                                    error ? <div className = "alert alert-danger">
                                                        Please check you informations.
                                                    </div> : null
                                                }
                                                 {
                                                    errorNumber ? <div className = "alert alert-danger">
                                                        Please check your month value.Input must be number.
                                                    </div> : null
                                                }{
                                                    errorRange ? <div className = "alert alert-danger">
                                                        The month value must be between 0 and 100 (Including 0 and 100).
                                                    </div> : null
                                                }
                                                <form onSubmit = {this.updateUser.bind(this,dispatch)}>
                                                    <div className = "form-group">
                                                        <label htmlFor = "name">Name</label>
                                                        <input 
                                                        type = "text"
                                                        name = "name"
                                                        id = "id"
                                                        placeholder = "Enter Name"
                                                        className = "form-control"
                                                        value = {name}
                                                        onChange = {this.changeInput}
                                                        />
                                                    </div>

                                                    <div className = "form-group">
                                                        <label htmlFor = "department">Department</label>
                                                        <input 
                                                        type = "text"
                                                        name = "department"
                                                        id = "id"
                                                        placeholder = "Enter Department"
                                                        className = "form-control"
                                                        value = {department}
                                                        onChange = {this.changeInput}
                                                        />
                                                    </div>

                                                    <div className = "form-group">
                                                        <label htmlFor = "salary">Salary</label>
                                                        <input 
                                                        type = "text"
                                                        name = "salary"
                                                        id = "id"
                                                        placeholder = "Enter Salary"
                                                        className = "form-control"
                                                        value = {salary}
                                                        onChange = {this.changeInput}
                                                        />
                                                    </div>

                                                    
                                                    <div className = "form-group">
                                                        <label htmlFor = "performanceArray">Performances per Month</label>
                                                        <div className="form-group input-group-prepend">
                                                           <span className="input-group-text">Jan:</span> 
                                                           <input 
                                                                type = "text"
                                                                name = "performanceJan"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceJan}
                                                                onChange = {this.changeInput}
                                                           />                                                                                                               
                                                           <span className="input-group-text">Feb:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceFeb"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceFeb}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Mar:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceMar"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceMar}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Apr:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceApr"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceApr}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">May:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceMay"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceMay}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Jun:</span>  
                                                           <input 
                                                                type = "text"
                                                                name = "performanceJun"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceJun}
                                                                onChange = {this.changeInput}
                                                           />                                                                                                                                                                                                                                                     
                                                        </div>
                                                        
                                                        
                                                        <div className="form-group input-group-prepend">
                                                           <span className="input-group-text">Jul:&nbsp;</span> 
                                                           
                                                           <input 
                                                                type = "text"
                                                                name = "performanceJul"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceJul}
                                                                onChange = {this.changeInput}
                                                           />                                                                                                               
                                                           <span className="input-group-text">Aug:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceAug"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceAug}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Sept:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceSept"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceSept}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Oct:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceOct"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceOct}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Nov:</span>
                                                           <input 
                                                                type = "text"
                                                                name = "performanceNov"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceNov}
                                                                onChange = {this.changeInput}
                                                           /> 
                                                           <span className="input-group-text">Dec:</span>  
                                                           <input 
                                                                type = "text"
                                                                name = "performanceDec"
                                                                id = "id"
                                                                //placeholder = "Enter Performance"
                                                                className = "form-control"
                                                                value = {performanceDec}
                                                                onChange = {this.changeInput}
                                                           />                                                                                                                                                                                                                                                     
                                                        </div>

                                                    
                                                    </div>
                                                    

                                                    <button className = "btn btn-success btn-block" type = "submit"> Update User</button>

                                                </form>
                                            </div>          
                                        </div>                                                              
                                </div>
                            )
                        }
                }
            </UserConsumer>
        )



       
    }
}
export default UpdateUser;