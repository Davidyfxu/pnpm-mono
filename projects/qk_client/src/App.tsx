import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Chapter6() {
  return (
    <div className="App">
      <Router>
        <Link to="/micro1">micro-app1应用</Link>
        <br />
        <Link to="/micro2">micro-app2应用</Link>
      </Router>
      {/* 切换导航将微应用渲染到container容器中 */}
      <div id="container"></div>
    </div>
  );
}

export default App;
