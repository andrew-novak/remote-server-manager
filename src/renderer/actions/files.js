import { SET_ALL_FILENAMES } from "../constants/actionTypes";
import { add as addSnackbar } from "./snackbars";
import { clear as clearDropzone } from "./dropzones";
import { sendWithResponse } from "../ipc";
import { close as closeEditor } from "./codeEditor";

export const getState = ({ sshConfig, sectionPaths }) => async (dispatch) => {
  const reply = await sendWithResponse("get-state", {
    sshConfig,
    sectionPaths,
  });
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
  const { error } = await sendWithResponse("send-files", {
    sshConfig,
    files: reducedFiles,
    targetDir,
  });
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
  const { error } = await sendWithResponse("delete-file", { sshConfig, path });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "File deleted"));
  dispatch(closeDialog());
  return dispatch(getState({ sshConfig, sectionPaths }));
};

export const createFile = ({
  sshConfig,
  filename,
  content,
  tempDir,
  targetDir,
  goBack,
  sectionPaths,
}) => async (dispatch) => {
  const { error } = await sendWithResponse("create-file", {
    sshConfig,
    filename,
    content,
    tempDir,
    targetDir,
  });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "The file has been created"));
  dispatch(closeEditor(goBack));
  return dispatch(getState({ sshConfig, sectionPaths }));
};

export const overrideFile = ({
  sshConfig,
  originalFilename,
  filename,
  content,
  tempDir,
  targetDir,
  goBack,
  sectionPaths,
}) => async (dispatch) => {
  const { error } = await sendWithResponse("override-file", {
    sshConfig,
    originalFilename,
    filename,
    content,
    tempDir,
    targetDir,
  });
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("info", "The file has been overriden"));
  dispatch(closeEditor(goBack));
  return dispatch(getState({ sshConfig, sectionPaths }));
};
