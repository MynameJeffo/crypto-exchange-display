import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from '../src/Home';
import Admin from '../src/AppAdmin';

class App extends Component {

render() {
  const options = {
    insertModalFooter: this.createCustomModalFooter
  };
    return (
      <div className="App">
        
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/qwerasdf' component={Admin}></Route>
        </Switch>
        
      </div>
    )
  }
}
export default App