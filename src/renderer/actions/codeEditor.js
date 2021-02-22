import {
  CODE_EDITOR_OPEN,
  CODE_EDITOR_CLOSE,
  CODE_EDITOR_SET_CODE,
} from "../constants/actionTypes";

import { sendWithResponse } from "../ipc";

export const openNew = (section) => async (dispatch) =>
  dispatch({ type: CODE_EDITOR_OPEN, section, existing: false });

export const openExisting = ({
  sshConfig,
  location,
  section,
  filename,
  goToEditor,
}) => async (dispatch) => {
  const { error, content } = await sendWithResponse("get-file-text", {
    sshConfig,
    path: `${location}/${filename}`,
  });
  if (error) return console.log("error: ", error);
  dispatch({
    type: CODE_EDITOR_OPEN,
    section,
    existing: true,
    filename,
    code: content,
  });
  return goToEditor();
};

export const close = (goBack) => (dispatch) => {
  goBack();
  dispatch({ type: CODE_EDITOR_CLOSE });
};

export const setCode = (code) => (dispatch) => {
  dispatch({ type: CODE_EDITOR_SET_CODE, code });
};
