import {
  SNACKBAR_ADD_NEW,
  SNACKBAR_DISPLAY_NEXT,
  SNACKBAR_HIDE_CURRENT,
  SNACKBAR_REMOVE_CURRENT,
} from "../constants/actionTypes";

export const add = (variant, message) => (dispatch) => {
  dispatch({ type: SNACKBAR_ADD_NEW, variant, message });
};

export const displayNext = () => (dispatch) => {
  dispatch({ type: SNACKBAR_DISPLAY_NEXT });
};

export const hideCurrent = () => (dispatch) => {
  dispatch({ type: SNACKBAR_HIDE_CURRENT });
};

export const removeCurrent = () => (dispatch) => {
  dispatch({ type: SNACKBAR_REMOVE_CURRENT });
};
