import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from "axios";
import validator from 'validator';


var uniqid = require('uniqid');

const Animation = posed.div({
     visible : {
         opacity:1,
         applyAtStart :{ //Yani başta hemen devreye girsin.
             display: "block"
         } 
     },
     hidden : {
        opacity:0,
        applyAtEnd :{ //Animation'u görüp sonrasında kaybetmeliyiz,yani en son .
            display: "none"
        } 
    }

});


class AddUser extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }

    state = {
       visible : false,
       showChart:false,
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

    changeVisibility = (e) =>{
    
        this.setState({
            visible : !this.state.visible
        })
        
    }

    addUser = async (dispatch,e) =>{
          e.preventDefault() //Sayfa otomatik yenileniyor.Formun default davranışıdır bu. Bunu engelledik en başta bu fonksiyonla.
          this.state.performanceArray.length = 0;
          const{name,department,salary,
            performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,
            performanceArray} = this.state //Daha yazarken yukardaki state'in içine gittiği için,direk yazılan değerler böyle ulaşırız.
          
          performanceArray.push(performanceJan,performanceFeb,performanceMar,
                                performanceApr,performanceMay,performanceJun,
                                performanceJul,performanceAug,performanceSept,
                                performanceOct,performanceNov,performanceDec);
          

          const newUser = {
              //id : uniqid(), json-server oto unique id atıyor zaten gerek kalmadı.
              name,  // name : name yazmak yerine ES6 ile gelen bu özellik kullanılabilir.
              department,
              salary,
              performanceArray
          }
          console.log("New User : " ,newUser);
          //addUser actionu oluşturuluyor,delette olduğu gibi.
               
        
          
          if(!this.validateForm()){
              this.setState({
                  error : true
              })
              return; //alttaki işlemlere geçmesin diye return ile sonlanmalı
          }


          const response = await axios.post("http://localhost:3004/users",newUser);
          
          dispatch({
              type : "ADD_USER",
              payLoad : response.data
          });

         
          localStorage.setItem('renderChartJs',JSON.stringify(true));
          
          //Redirect işlemi
          this.props.history.push("/home");
                 
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
        const {name,salary,department,
            performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,performanceArray} = this.state;
          
        if(name === "" || department === "" || salary === "" ||
           performanceJan === "" || performanceFeb === "" || performanceMar === "" ||
           performanceApr === "" || performanceMay === "" || performanceJun === "" ||
           performanceJul === "" || performanceAug === "" || performanceSept === ""||
           performanceOct === "" || performanceNov === "" || performanceDec === "" ){
               
            return false;
        }else
       
            return true;
    }

    reRenderChartJs = () => {
        localStorage.setItem('renderChartJs',JSON.stringify(true));
    };
   
    render() {

        const {visible,name,salary,department,
            performanceJan,performanceFeb,performanceMar,
            performanceApr,performanceMay,performanceJun,
            performanceJul,performanceAug,performanceSept,
            performanceOct,performanceNov,performanceDec,error,errorNumber,errorRange} = this.state;
        

        return(
            <UserConsumer>
                {
                    value => {
                           const {dispatch} = value;
                            // col d-block eklemek açılınca sidebar sağa yaslı şekilde soldan küçülmeyi sağladı.
                            return (
                                <div className = "col d-block col-md-12 mb-4">
                                    
                                    {/* btn-block bütününü kapsasın. */}
                                    {/*<button onClick = {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>*/}
                                    {/*<div style = {{display:'none'}}><Chart ref={this.inputRef}/></div>*/}
                                    {/*<Animation pose = {visible ? "visible" : "hidden"}>*/}
                                        <div className = "card">
                                            <div className = "card-header">
                                                <h4>Add User Form</h4>
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
                                                <form onSubmit = {this.addUser.bind(this,dispatch)}>
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
                                                        type = "number"
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
                                                    
                                                    <button className = "btn btn-success btn-block" type = "submit" onClick = {this.reRenderChartJs}> Add User</button>

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
export default AddUser;