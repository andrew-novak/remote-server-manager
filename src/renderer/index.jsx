import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { connect, Provider as StoreProvider } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { render } from "react-dom";

import { getStored as getStoredConfig } from "./actions/config";
import store from "./store";
import theme from "./theme";
import Routes from "./Routes";
import ConsecutiveSnackbars from "./components/ConsecutiveSnackbars";

const InitWrap = ({ children, getStoredConfig }) => {
  useEffect(getStoredConfig, []);
  return children;
};
const InitWrapper = connect(null, { getStoredConfig })(InitWrap);

const App = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter basename={window.location.pathname}>
        <InitWrapper>
          <Routes />
        </InitWrapper>
      </HashRouter>
      <ConsecutiveSnackbars />
    </MuiThemeProvider>
  </StoreProvider>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
