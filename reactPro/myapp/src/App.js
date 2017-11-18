import React, { Component } from 'react';
import './scss/main.scss';
import { Route, Redirect ,Switch} from "react-router-dom"
import './scss/home.scss';
import './scss/kind.scss';


import MainFooter from './components/mainFooter' ;
import Home from './components/home' ;
import Bookshelf from './components/bookshelf' ;
import Mine from './components/mine' ;
import Kind from './components/kind' ;
import Search from './components/search' ;


class App extends Component {
    constructor(props){
        super(props)
    };

  render(){
    return (
      <div className="App">
              <header className="header">
              </header>
              <div id="content">
                  <Switch>
                      <Route exact path='/home' component={Home}/>
                      <Route path='/bookshelf' component={Bookshelf}/>
                      <Route path='/mine' component={Mine}/>
                      <Route path='/kind/:path&:name' component={Kind}/>
                      <Route path='/search' component={Search}/>
                      <Redirect  to='/home'/>
                  </Switch>


              </div>

        <footer id="footer">
            <MainFooter></MainFooter>
        </footer>
      </div>
    );
  }
}

export default App;
