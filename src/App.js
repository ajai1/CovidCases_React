import React, { Component } from "react";
import classes from "./App.css";
import axios from "./Axios";

import NewsComponent from "./Containers/News/NewsComponent";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <h1>Covid-19 Updates</h1>
        <div>
          <NewsComponent></NewsComponent>
        </div>
      </div>
    );
  }
}

export default App;
