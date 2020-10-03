import React from 'react';
import './App.scss';
import Home from './components/Home/Home';
import Tachi from './components/Tachi/Tachi';
import Bradi from './components/Bradi/Bradi';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Switch>
          <Route path="/tachicardia">
            <Tachi />
          </Route>
          <Route path="/bradicardia">
            <Bradi />
          </Route>

          <Route exact path="/">
              <Home/>
          </Route>

        </Switch> 

      <p class="info">This non-profit application is created for demonstration purposes only. Check out guidelines at www.escardio.org . </p>
    </div>
  );
}

export default App;
