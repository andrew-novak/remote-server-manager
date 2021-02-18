import {
  CODE_EDITOR_OPEN,
  CODE_EDITOR_CLOSE,
  CODE_EDITOR_SET_CODE,
} from "../constants/actionTypes";

import { sendWithResponse } from "../ipc/renderer";
import { add as addSnackbar } from "./snackbars";
import { getState } from "./files";

export const openNew = (section) => async (dispatch) =>
  dispatch({ type: CODE_EDITOR_OPEN, section, existing: false });

export const openExisting = (section, filename) => async (dispatch) => {
  const { error, content } = await sendWithResponse("get-file-text", {
    section,
    filename,
  });
  if (error) return console.log("error: ", error);
  return dispatch({
    type: CODE_EDITOR_OPEN,
    section,
    existing: true,
    filename,
    code: content,
  });
};

export const close = () => (dispatch) => dispatch({ type: CODE_EDITOR_CLOSE });

export const setCode = (code) => (dispatch) => {
  dispatch({ type: CODE_EDITOR_SET_CODE, code });
};

export const save = (section, filename, content) => async (dispatch) => {
  const { error } = await sendWithResponse("override-file", {
    section,
    filename,
    content,
  });
  if (error) return console.log("error: ", error);
  dispatch(addSnackbar("The file has been successfully overriden"));
  dispatch(close());
  return dispatch(getState());
};
