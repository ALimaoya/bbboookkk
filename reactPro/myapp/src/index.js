import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route  } from 'react-router-dom'
import './scss/main.scss';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css' ;
import registerServiceWorker from './registerServiceWorker';
{
// import store from './store'

}

ReactDOM.render(
    <Router>
        <Route path='/' component = { App } />
    </Router> ,
    document.getElementById('root')
);
{
    // function renderDom(){

// }
}

registerServiceWorker();
{
    // store.subscribe(renderDom) ;
}
