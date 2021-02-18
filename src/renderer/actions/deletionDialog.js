import {
  DELETION_DIALOG_OPEN,
  DELETION_DIALOG_CHANGE_INPUT,
  DELETION_DIALOG_CANCEL,
  DELETION_DIALOG_WRONG_FILENAME,
} from "../constants/actionTypes";
import { deleteFile } from "./files";

export const open = (section, filename) => (dispatch) => {
  dispatch({ type: DELETION_DIALOG_OPEN, section, filename });
};

export const changeInput = (newValue) => (dispatch) => {
  dispatch({ type: DELETION_DIALOG_CHANGE_INPUT, newValue });
};

export const close = () => (dispatch) => {
  dispatch({ type: DELETION_DIALOG_CANCEL });
};

export const confirm = (section, filename, input) => (dispatch) => {
  if (input !== filename) {
    return dispatch({ type: DELETION_DIALOG_WRONG_FILENAME });
  }
  return dispatch(deleteFile(section, filename, close));
};
