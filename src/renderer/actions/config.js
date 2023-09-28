import {
  CONFIG_SHOW_HELPER_TEXT,
  CONFIG_SET_STORED,
  CONFIG_SET_INPUTS,
  CONFIG_SET_INPUT,
  CONFIG_LOADING_STOP,
  CONFIG_RESTART,
} from "../constants/actionTypes";
import { sendWithResponse } from "../ipc";
import { add as addSnackbar } from "./snackbars";

export const getStored = () => async (dispatch) => {
  try {
    const { error, config } = await sendWithResponse({ channel: "get-config" });
    if (error) {
      console.error(error);
      dispatch({ type: CONFIG_LOADING_STOP });
      return dispatch(addSnackbar("error", error.message));
    }
    return dispatch({ type: CONFIG_SET_STORED, config });
  } catch (err) {
    console.error(err);
    dispatch({ type: CONFIG_LOADING_STOP });
    return dispatch(addSnackbar("error", err.message));
  }
};

export const setStored = ({ config, goHome }) => async (dispatch) => {
  const { error, errElem } = await sendWithResponse({
    channel: "set-config",
    data: { config },
  });
  if (error) {
    console.error(error);
    if (errElem) {
      dispatch({ type: CONFIG_SHOW_HELPER_TEXT, errElem, error });
      return dispatch(addSnackbar("error", "Problem with entered info"));
    }
    return dispatch(addSnackbar("error", error.message));
  }
  dispatch({ type: CONFIG_SET_STORED, config });
  return goHome();
};

export const getInputs = () => async (dispatch) => {
  const { error, config } = await sendWithResponse({ channel: "get-config" });
  if (error) {
    console.error(error);
    return dispatch(addSnackbar("error", error.message));
  }
  return dispatch({ type: CONFIG_SET_INPUTS, inputs: config });
};

export const setInput = ({ outerField, field, value }) => async (dispatch) =>
  dispatch({ type: CONFIG_SET_INPUT, outerField, field, value });

export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
