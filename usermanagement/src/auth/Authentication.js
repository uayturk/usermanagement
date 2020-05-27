import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from "axios"


class Authentication extends Component {

    state = {
        visible : false,
        email : JSON.parse(localStorage.getItem('isChecked')) ? localStorage.getItem('rememberMeEmail') : "",
        password: JSON.parse(localStorage.getItem('isChecked')) ? localStorage.getItem('rememberMePassword') : "",
        error : false,
        emailFound:false,
        isRegister:true,
        isAuth:false,
        registeredSuccess: false,
     }

     validateForm = () => {
        const {email,password} = this.state;

        if(email === "" || password === ""){
            return false;
        }else
            return true;
    }


    registerUser = async (dispatch,e) =>{
        e.preventDefault() //Sayfa otomatik yenileniyor.Formun default davranışıdır bu. Bunu engelledik en başta bu fonksiyonla.
       
        const{email,password} = this.state //Daha yazarken yukardaki state'in içine gittiği için,direk yazılan değerler böyle ulaşırız.
        
      

        const newRegisteredUser = {
          email,
          password
        }
       
        //addUser actionu oluşturuluyor,delette olduğu gibi.

        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return; //alttaki işlemlere geçmesin diye return ile sonlanmalı.
        }


        const response = await axios.post("http://localhost:3001/auths",newRegisteredUser);
        
        dispatch({
            type : "REGISTER_USER",
            payLoad : response.data
        });

        //Redirect işlemi
        //this.props.history.push("/");
        this.setState({ 
            isRegister: !this.state.isRegister,
            registeredSuccess : !this.state.registeredSuccess
        })
        
       
    }

    validateUser = async (email,password,e) =>{
        e.preventDefault() //Sayfa otomatik yenileniyor.Formun default davranışıdır bu. Bunu engelledik en başta bu fonksiyonla.
       
        const{emailFound} = this.state //Daha yazarken yukardaki state'in içine gittiği için,direk yazılan değerler böyle ulaşırız.


        if(!this.validateForm()){
            this.setState({
                error : true
            })
            return; //alttaki işlemlere geçmesin diye return ile sonlanmalı
        }


        const response = await axios.get("http://localhost:3001/auths");
        

        for(var i =0 ; i<response.data.length ; i++){ 
            
            if(response.data[i].email === email && response.data[i].password === password ){
                
                this.setState({
                    isAuth : true,
                    emailFound:true
                })
                localStorage.setItem('rememberMeEmail',email);
                localStorage.setItem('rememberMePassword',password);

                //In here, we are trying to send our isAuth data to parent (App)
                return this.props.dataFromChildToParent(this.state.isAuth);
                
            }
        }
        if(!emailFound){
            this.setState({
                error : true
            })
        }
        
          
    }

    changeInput = (e) =>{
        this.setState({
            
            //[e.target.name] burdaki name; name = "name" , name = "department" , name = "salary" ifadesidir.
            [e.target.name] :e.target.value // formun içine girilen değeri aldı, value = {name},{department} ve ya {salary} 
                                //dendiği için name inputunda otomatik olarak setledi.
            
        })
        
        
    }
    

    clickedRememberMe  = (e) =>{       
        localStorage.setItem('isChecked',JSON.stringify(e.target.checked))               
      };

    toggle = () => {
        this.setState({ 
            isRegister: !this.state.isRegister
        })
      };
    
      // about remember me
      // https://programmingwithmosh.com/react/localstorage-react/

    render() {

        const {email,password,isRegister,error,registeredSuccess} = this.state;

        return (
            <div className="container-fluid">
            <div className = "col-sm-9 col-md-7 col-lg-5 mx-auto">                            
                {
                isRegister ?
                   
                <form>
                    {
                        error ? <div className = "alert alert-danger">
                            Please check your email and password.
                        </div> : null
                    }
                   {
                        registeredSuccess ? <div className = "alert alert-success">
                            User registered successfully.
                        </div> : null
                    }
                    
                    <div className="container">
                        <div className="row">
                            
                            <h3>Sign In </h3>
                            
                           <h6 style={{position:"relative",left : "10px",top : "10px"}}>(Email:<b> admin@admin.com</b> Password:<b> admin</b>)</h6>
                            
                           
                        </div>
                    </div>

                    <div className="form-group"> 
                        <label htmlFor = "name">Email</label>
                        <input 
                        type = "text"
                        name = "email"
                        id = "id"
                        placeholder = "Enter Your Email"
                        className = "form-control"
                        value = {email}
                        //defaultValue={email}                     
                        onChange = {this.changeInput}
                        />
                    </div>

                    <div className="form-group">
                    <label htmlFor = "password">Password</label>
                        <input 
                        type = "password"
                        name = "password"
                        id = "id"
                        placeholder = "Enter Your Password"
                        className = "form-control"
                        value = {password}
                        onChange = {this.changeInput}
                        />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" onClick = {this.clickedRememberMe} defaultChecked={JSON.parse(localStorage.getItem('isChecked'))}/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block"  onClick = {this.validateUser.bind(this,email,password)} >Login</button>
                    <div className="btn btn-block" style={{cursor: "default"}}>Or</div>
                    <button type="register" className="btn btn-success btn-block" onClick = {this.toggle}>Register</button>
                   

                
                    {/*
                            <div className = "alert alert-danger">
                                Please check your authentication informations.
                            </div>
                    */}
                </form>  :  
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
                                                         autocomplete="off"
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
                                                         autocomplete="off"
                                                         id = "id"
                                                         placeholder = "Enter Your Password"
                                                         className = "form-control"
                                                         value = {password}
                                                         onChange = {this.changeInput}
                                                         />
                                                     </div>                                                                                                                                    
 
                                                     <button className = "btn btn-success btn-block" type = "submit"> Register User</button>
                                                     <button type="register" className="btn btn-primary btn-block" onClick = {this.toggle}>Back to Login Page</button>
                                                 </form>
                                             </div>          
                                         </div>                           
                                     {/*</Animation>*/}
                                 </div>
                             )
                        }
                      }
                    </UserConsumer>
                }                
                {/*</Animation>*/}
            </div>
            
        </div>
        )
    }
}

export default Authentication;