import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {UserProvider} from "./context";


//App'i UserProvider içine alarak sarmalama işlemini yaptık
ReactDOM.render(

  <UserProvider>
     {/*<React.StrictMode></React.StrictMode> */}
      <App />
  </UserProvider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
