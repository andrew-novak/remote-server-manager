import {
  CONFIG_LOADING_STOP,
  CONFIG_SET,
  CONFIG_SHOW_HINT,
  CONFIG_RESTART,
} from "../constants/actionTypes";
import { sendWithResponse } from "../ipc";
import { add as addSnackbar } from "./snackbars";

export const setConfig = ({
  host,
  username,
  privateKey,
  temporary,
  config: configDir,
  static: staticDir,
  redirect,
}) => async (dispatch) => {
  const config = {
    ssh: { host, username, privateKey },
    temporary,
    sections: { config: configDir, static: staticDir },
  };
  const { error, errElem } = await sendWithResponse("set-config", { config });
  if (error) {
    dispatch({ type: CONFIG_SHOW_HINT, error, errElem });
    const snackError = errElem ? "Problem with entered info" : error;
    return dispatch(addSnackbar("error", snackError));
  }
  dispatch({ type: CONFIG_SET, config });
  return redirect();
};

export const getConfig = () => async (dispatch) => {
  const { error, config } = await sendWithResponse("get-config");
  if (error) {
    dispatch({ type: CONFIG_LOADING_STOP });
    return dispatch(addSnackbar("error", error));
  }
  return dispatch({ type: CONFIG_SET, config });
};

// eslint-disable-next-line import/prefer-default-export
export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
