import React, { Component } from 'react';
import './App.css';
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Users from './components/Users';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
import {BrowserRouter as Router,Route,Switch,withRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound';
import Contribute from './pages/Contribute';
import Chart from './components/Chart'
import Authentication from './auth/Authentication'
import { Redirect } from 'react-router-dom'




class App extends Component {
  
  

  state = {
    isAuth : JSON.parse(localStorage.getItem('isAuthValue')),
    error : false,
 }

 updateIsAuth(value){
  
    if(value === true){
      
      this.setState({
         isAuth: value,
      });
    }else{
      this.setState({
        isAuth: false,
      });
     
    }
  
 }
 

render(){
  const {isAuth,error} = this.state;
  //When you using localstorage with boolean values,you can not easly take values. Because web storage only stores strings. 
  //Check such a nice answer about this : https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
  localStorage.setItem('isAuthValue',JSON.stringify(this.state.isAuth));
  return (
      
      <Router>
       
        <Navbar title = "User Management" auth = {this.state.isAuth} dataFromChildNavbar={this.updateIsAuth.bind(this)} />
        
      <hr/>
      {
         isAuth ? 
         <div className="row">
          <div className = "col-8">
            
                <div className="row">   
                      
                    <Sidebar/>
                    
                    {/*col d-block eklemek açılınca sidebar sağa yaslı şekilde soldan küçülmeyi sağladı.*/}
                    <div className="col d-block">
                    

                        {/*<Route exact path = "/" component = {Home}/> {/*exact yaparak sadece / görürse onun altını, /about görürse sadece about altını alır. Yani /about'ta '/' bu var diye üsteki sadece '/' olanı da render etmez. */}                                    
                
                        {/*<Route exact path = "/about" component = {About}/> {/*Mesela http://localhost:3000/about gibi kullanımlar için. Route içine alınır React'ta. Path vermek kısaca.*/} 
                
                        <Redirect to='/home' />
                        <Switch> {/*Tanımlı olmayan bir router geldiğinde default bir page gösterilecek.*/}
                          
                          <Route exact path = "/home" component = {Users}/>
                          <Route exact path = "/add" component = {AddUser}/>
                          {/*<Route
                              exact path='/add'
                              render={(props) => <AddUser {...props} isAuthed={true} />}
                          />*/}
                          <Route exact path = "/github" component = {Contribute}/>
                          <Route exact path = "/update/:id" component = {UpdateUser}/>
                          <Route component = {NotFound}/>
                        </Switch>  
                      {/*</div>*/}
                    </div>
                
                </div>
          
            
          </div>
          
          <div className = "col-4">
              <div className="container-fluid">
                  {<Chart/>}
              </div>
          </div>
        </div>
         :
         <Authentication dataFromChildToParent={this.updateIsAuth.bind(this)}/>
         
      }
                  
      </Router> 
    
  );
}
  
}


export default App;
