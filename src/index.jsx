import React from "react";
import { render } from "react-dom";
import { Provider as StoreProvider, connect } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import store from "./store";
import theme from "./theme";
import HomeScreen from "./screens/HomeScreen";
import CodeEditorScreen from "./screens/CodeEditorScreen";

const Screens = ({ isCodeEditorOpen }) =>
  isCodeEditorOpen ? <CodeEditorScreen /> : <HomeScreen />;

const mapState = (state) => {
  const isCodeEditorOpen = state.codeEditor.isOpen;
  return { isCodeEditorOpen };
};

const ConnectedScreens = connect(mapState)(Screens);

const App = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedScreens />
    </MuiThemeProvider>
  </StoreProvider>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
