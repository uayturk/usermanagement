import React from 'react'
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"


const state = {
    isAuth:true
 }


 function Navbar({title ,auth ,dataFromChildNavbar}) {

    
    return (    
                                                        
        <nav className = "navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
           <a href = "/" className = "navbar-brand">{title}</a> 

           <ul className="navbar-nav ml-auto">
               {/*<li className = "nav-item active">
                   <Link to = "/" className = "nav-link">Login</Link>
               </li>
               <li className = "nav-item active">
                   <Link to = "/register" className = "nav-link">Register</Link>
               </li> */}
               {
                   auth ? 
                   <li className = "row nav-item active">
                       <a type="logout" style={{cursor : "default"}} className="btn nav-link">Welcome {localStorage.getItem('rememberMeEmail')}</a>
                      <button type="logout" className="btn nav-link" onClick = {dataFromChildNavbar.bind(this,false)}>Log Out</button>
                  </li> : 
                  null
               }
                                          
           </ul>
        </nav>
       
    )
}

// Bu Navbar başka yerde kullanılacaksa buna mutlaka 'title' isminde
// ve propType'i string olan ve mutlaka gönderilmesi gereken bir tane propsu göndermek gerek. Anlamı bu.
Navbar.propTypes = {
    title : PropTypes.string.isRequired
}
//Eğer gönderilmez ise default olarak bunu ayarla
Navbar.defaultProps = {
    title : "Default App"
}

export default Navbar;

