import React from "react";
import { render } from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import store from "./store";
import theme from "./theme";
import HomeScreen from "./screens/HomeScreen";

const App = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HomeScreen />
    </MuiThemeProvider>
  </StoreProvider>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
