import {
  SET_ALL_FILENAMES,
  CODE_EDITOR_SHOW_HELPER_TEXT,
} from "../constants/actionTypes";
import { add as addSnackbar } from "./snackbars";
import { clear as clearDropzone } from "./dropzones";
import { sendWithResponse } from "../ipc";
import { close as closeEditor } from "./codeEditor";

export const getState = ({ sshConfig, sectionPaths }) => async (dispatch) => {
  const channel = "get-state";
  const data = { sshConfig, sectionPaths };
  const reply = await sendWithResponse({ channel, data });
  {
    const { error, sections } = reply;
    if (error) return dispatch(addSnackbar("error", error));
    return dispatch({ type: SET_ALL_FILENAMES, sections });
  }
};

export const sendFiles = ({
  sshConfig,
  targetDir,
  section,
  files,
  sectionPaths,
}) => async (dispatch) => {
  const reducedFiles = files.map((file) => ({
    name: file.name,
    path: file.path,
  }));
  const channel = "send-files";
  const data = { sshConfig, files: reducedFiles, targetDir };
  const { error } = await sendWithResponse({ channel, data });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "File(s) addded"));
  dispatch(clearDropzone(section));
  return dispatch(getState({ sshConfig, sectionPaths }));
};

export const deleteFile = ({
  sshConfig,
  location,
  filename,
  closeDialog,
  sectionPaths,
}) => async (dispatch) => {
  const path = `${location}/${filename}`;
  const { error } = await sendWithResponse({
    channel: "delete-file",
    data: { sshConfig, path },
  });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "File deleted"));
  dispatch(closeDialog());
  return dispatch(getState({ sshConfig, sectionPaths }));
};

export const createFile = ({
  sshConfig,
  filename,
  content,
  targetDir,
  goBack,
  sectionPaths,
}) => async (dispatch) => {
  const channel = "create-file";
  const data = { sshConfig, filename, content, targetDir };
  const { error, errElem } = await sendWithResponse({ channel, data });
  if (error) {
    if (errElem) {
      dispatch({ type: CODE_EDITOR_SHOW_HELPER_TEXT, errElem, error });
      return dispatch(addSnackbar("error", "Problem with entered info"));
    }
    return dispatch(addSnackbar("error", error));
  }
  dispatch(addSnackbar("info", "The file has been created"));
  dispatch(closeEditor(goBack));
  return dispatch(getState({ sshConfig, sectionPaths }));
};

export const overrideFile = ({
  sshConfig,
  originalFilename,
  filename,
  content,
  targetDir,
  goBack,
  sectionPaths,
}) => async (dispatch) => {
  const channel = "override-file";
  const data = {
    sshConfig,
    originalFilename,
    filename,
    content,
    targetDir,
  };
  const { error } = await sendWithResponse({ channel, data });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "The file has been overriden"));
  dispatch(closeEditor(goBack));
  return dispatch(getState({ sshConfig, sectionPaths }));
};
