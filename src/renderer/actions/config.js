import {
  CONFIG_SHOW_HELPER_TEXT,
  CONFIG_SET,
  CONFIG_LOADING_STOP,
  CONFIG_RESTART,
} from "../constants/actionTypes";
import { sendWithResponse } from "../ipc";
import { add as addSnackbar } from "./snackbars";

export const setConfig = ({ config, goHome }) => async (dispatch) => {
  const { error, errElem } = await sendWithResponse("set-config", { config });
  if (error) {
    if (errElem) {
      dispatch({ type: CONFIG_SHOW_HELPER_TEXT, errElem, error });
      return dispatch(addSnackbar("error", "Problem with entered info"));
    }
    return dispatch(addSnackbar("error", error));
  }
  dispatch({ type: CONFIG_SET, config });
  return goHome();
};

export const getConfig = () => async (dispatch) => {
  const { error, config } = await sendWithResponse("get-config");
  if (error) {
    dispatch({ type: CONFIG_LOADING_STOP });
    return dispatch(addSnackbar("error", error));
  }
  return dispatch({ type: CONFIG_SET, config });
};

export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
