import React, { Component } from 'react'
import User from "./User";
import UserConsumer from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import posed from 'react-pose';



class Users extends Component {

    constructor(){
        super();
        this.state = {
            search:'',
    
        }
      
    }

    updateSearch = (e) =>{
        
        this.setState({
            [e.target.name]:e.target.value.substr(0,20),
            isVisible: !this.state.isVisible 
          })
          
          
      }

    render() {
        
        const {search} = this.state;
        
       return(
           <UserConsumer>
               {
                   value => {
                       const {users} = value;
                      
                       let filteredUsers = users.filter(
                            (user) => {
                                 return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                            }
                       );
     
                       return (
                            <div>
                                
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <div className="input-group col-md-12">
                                            <input 
                                                type = "text"
                                                name = "search"
                                                id = "id"
                                                placeholder = "Search User..."
                                                className = "form-control"
                                                value = {search}
                                                onChange = {this.updateSearch}
                                                
                                                />
                                                <span className="input-group-append">
                                                  <div className="input-group-text bg-transparent">
                                                  <FontAwesomeIcon icon={faSearch}/>
                                                    </div>
                                                </span>
                                                
                                        </div>
                                    </div>
                                </div>
                              
                                {
                                     
                                    filteredUsers.map(user => {
                                    
                                        return(      
                                           
                                            <User                                             
                                                key = {user.id}
                                                id = {user.id}
                                                name = {user.name}
                                                department = {user.department}
                                                salary = {user.salary}                                              
                                                performanceArray = {user.performanceArray}
                                            />
                                           
                                        )

                                    })
                               
                                }
                              
                            </div>
                           
                        )
                   }
               }
           </UserConsumer>
       )




        
    }
}
export default Users;