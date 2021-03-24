/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setMenuListeners } from "./actions/appMenu";
import Loading from "./screens/Loading";
import Home from "./screens/Home";
import Config from "./screens/Config";
import CodeEditor from "./screens/CodeEditor";

const Routes = ({
  isLoading,
  isConfigured,
  isEditorOpen,
  setMenuListeners,
}) => {
  const history = useHistory();
  useEffect(() => setMenuListeners(history.push), []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (!isConfigured) return <Redirect to="/config" />;
          return <Home />;
        }}
      />

      <Route
        exact
        path="/code-editor"
        render={() => {
          if (!isConfigured) return <Redirect to="/config" />;
          if (!isEditorOpen) return <Redirect to="/" />;
          return <CodeEditor />;
        }}
      />

      <Route exact path="/config">
        <Config />
      </Route>

      <Route path="*">
        <h1>Catch All</h1>
      </Route>
    </Switch>
  );
};

const mapState = (state) => {
  const { isLoading, isConfigured } = state.config;
  const isEditorOpen = state.codeEditor.isOpen;
  return { isLoading, isConfigured, isEditorOpen };
};

export default connect(mapState, { setMenuListeners })(Routes);
