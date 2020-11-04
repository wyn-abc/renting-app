import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Index from "./pages/Index";
import List from "./pages/List";
import News from "./pages/News";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 路由重定向 */}
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        {/* 路由配置 */}
        <Route path="/home" component={Home} />
        <Route path="/index" component={Index} />
        <Route path="/list" component={List} />
        <Route path="/news" component={News} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
