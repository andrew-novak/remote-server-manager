import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "./screens/Loading";
import Home from "./screens/Home";
import Config from "./screens/Config";
import CodeEditor from "./screens/CodeEditor";

const Router = ({ isLoading, isConfigured }) => {
  if (isLoading) {
    return <Loading />;
  }

  const handleRender = () => {
    if (!isLoading && !isConfigfured) {
      return <Redirect to="/config" />;
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={handleRender}>
          <Home />
        </Route>
        <Route exact path="/config">
          <Config />
        </Route>
        <Route exact path="/code-editor" render={handleRender}>
          <CodeEditor />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapState = (state) => {
  const { isLoading, isConfigured } = state.config;
  return { isLoading, isConfigured };
};

export default connect(mapState)(Router);
