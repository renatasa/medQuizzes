import React from "react";
import "./App.scss";
import Home from "./components/Home/Home";
import Tachi from "./components/Tachi/Tachi";
import Bradi from "./components/Bradi/Bradi";
import QuestionsAndResult from "./components/QuestionsAndResult/QuestionsAndResult";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Home />

      <Switch>
        <Route path="/tachicardia">
          <Tachi />
        </Route>

        <Route path="/bradicardia">
          <Bradi />
        </Route>

        <Route path="/results">
          <QuestionsAndResult />
        </Route>
      </Switch>

      <p class="info">
        This non-profit application is created for demonstration purposes only.
        Check out guidelines at www.escardio.org .{" "}
      </p>
    </div>
  );
}

export default App;
