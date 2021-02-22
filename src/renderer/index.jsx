import React, { useEffect } from "react";
import { connect, Provider as StoreProvider } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { render } from "react-dom";

import { getConfig } from "./actions/config";
import store from "./store";
import theme from "./theme";
import Router from "./Router";

const InitWrap = ({ children, getConfig }) => {
  useEffect(getConfig, []);
  return children;
};
const InitWrapper = connect(null, { getConfig })(InitWrap);

const App = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <InitWrapper>
        <CssBaseline />
        <Router />
      </InitWrapper>
    </MuiThemeProvider>
  </StoreProvider>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
