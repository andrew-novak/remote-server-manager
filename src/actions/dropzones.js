import {
  DROPZONE_OPEN,
  DROPZONE_SET_FILES,
  DROPZONE_CLEAR,
  DROPZONE_CLOSE,
} from "../constants/actionTypes";

export const open = (section) => (dispatch) => {
  dispatch({ type: DROPZONE_OPEN, section });
};

export const setFiles = (section, files) => (dispatch) => {
  dispatch({ type: DROPZONE_SET_FILES, section, files });
};

export const clear = (section) => (dispatch) => {
  dispatch({ type: DROPZONE_CLEAR, section });
};

export const close = (section) => (dispatch) => {
  dispatch({ type: DROPZONE_CLOSE, section });
};
