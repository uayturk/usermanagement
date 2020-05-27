import React, { Component,useState } from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt,faHome,faProjectDiagram,faTimes,faBars } from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose';


const AnimationSidebar = posed.div({

  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '-600%', delay: 30 }

});


const AnimationMainDiv = posed.div({

  open: {
    x: '0%',
    delayChildren: 200,
    //staggerChildren: 50
  },
  closed: { x: '-50%', delay: 100 }

});

const AnimationItems = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});


export default class Sidebar extends Component {

  state = { 
    isOpen: true
   };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => {
    this.setState({ 
      isOpen: !this.state.isOpen 
    })
  };

  
  render() {
    const {isOpen} = this.state
    //style={isOpen ? null:{maxWidth : "4.633%"}}
    return (
      <div className={isOpen ? "col-lg-3 navbar-dark bg-dark mb-3 p-3 min-vh-100" : "col-lg-1 navbar-dark bg-dark mb-3 p-3 min-vh-100"} style={{position : "relative",left:"20px"}}> 
          <AnimationMainDiv>
           <button className="navbar-toggler bg-dark ml-2 mb-3 " style={{cursor : "pointer"}} onClick = {this.toggle}>
                  <AnimationSidebar>
                    { isOpen ? <FontAwesomeIcon icon={faTimes}/>
                             : <FontAwesomeIcon icon={faBars}/>
                    }
                  </AnimationSidebar>
            </button>
        
            <ul className="navbar-nav row">
                <li className = "row nav-item active p-3 ml-1 mb-3">
                    <div className="col-md-8 col-lg-3">                   
                        <FontAwesomeIcon className = "" icon={faHome} style={{color:"#8f9192"}}/>                     
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <div className="row">                                                                       
                                <AnimationSidebar pose = {isOpen ? "open" : "closed"}>
                                    <Link to = "/home" className = "nav-link d-inline p-3 ml-3">Home</Link>
                                </AnimationSidebar> 
                        </div>
                    </div>

                </li>

                <li className = "row nav-item active p-3 ml-1 mb-3">
                    <div className="col-md-8 col-lg-3">                   
                        <FontAwesomeIcon className = ""  icon={faUserAlt} style={{color:"#8f9192"}}/>                      
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <div className="row">                                                                       
                              <AnimationSidebar pose = {isOpen ? "open" : "closed"}>
                                  <Link to = "/add" className = "nav-link d-inline p-3 ml-3">
                                    <span>Add</span>&nbsp;<span>User</span>
                                  </Link> 
                                  
                              </AnimationSidebar>
                        </div>
                    </div>

                </li>

                <li className = "row nav-item active p-3 ml-1 mb-3">
                    <div className="col-md-8 col-lg-3">                   
                        <FontAwesomeIcon className = "" icon={faProjectDiagram} style={{color:"#8f9192"}}/>                     
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <div className="row">                                                                       
                              <AnimationSidebar pose = {isOpen ? "open" : "closed"}>
                                 <Link to = "/github" className = "nav-link d-inline p-3 ml-3">Project</Link> 
                              </AnimationSidebar>
                        </div>
                    </div>

                </li>

            </ul>
            
          </AnimationMainDiv>
    </div>
    )
  }
}


