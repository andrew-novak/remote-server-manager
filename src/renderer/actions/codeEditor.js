import {
  CODE_EDITOR_OPEN_NEW,
  CODE_EDITOR_OPEN_EXISTING,
  CODE_EDITOR_CLOSE,
  CODE_EDITOR_SET_FILENAME,
  CODE_EDITOR_SET_CODE,
} from "../constants/actionTypes";

import { sendWithResponse } from "../ipc";

const openExisting = (
  sshConfig,
  section,
  location,
  filename,
  goToEditor
) => async (dispatch) => {
  const { error, content } = await sendWithResponse("get-file-text", {
    sshConfig,
    path: `${location}/${filename}`,
  });
  if (error) return console.log("error: ", error);
  dispatch({
    type: CODE_EDITOR_OPEN_EXISTING,
    section,
    filename,
    code: content,
  });
  return goToEditor();
};

const openNew = (section, goToEditor) => (dispatch) => {
  dispatch({
    type: CODE_EDITOR_OPEN_NEW,
    section,
  });
  return goToEditor();
};

export const open = ({
  sshConfig,
  section,
  location,
  filename,
  goToEditor,
}) => (dispatch) => {
  if (location && filename) {
    return dispatch(
      openExisting(sshConfig, section, location, filename, goToEditor)
    );
  }
  return dispatch(openNew(section, goToEditor));
};

export const close = (goBack) => (dispatch) => {
  goBack();
  dispatch({ type: CODE_EDITOR_CLOSE });
};

export const setFilename = (filename) => (dispatch) =>
  dispatch({ type: CODE_EDITOR_SET_FILENAME, filename });

export const setCode = (code) => (dispatch) =>
  dispatch({ type: CODE_EDITOR_SET_CODE, code });
