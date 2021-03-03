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
    if (error) return console.log("error: ", error);
    return dispatch({ type: SET_ALL_FILENAMES, sections });
  }
};

export const sendFiles = ({ sshConfig, location, section, files }) => async (
  dispatch
) => {
  const reducedFiles = files.map((file) => ({
    name: file.name,
    path: file.path,
  }));
  const args = { sshConfig, files: reducedFiles, location };
  const reply = await sendWithResponse("send-files", args);
  const { isSuccessful, error } = reply;
  if (!isSuccessful) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("error", "Files addded successfully"));
  dispatch(clearDropzone(section));
  return dispatch(getState());
};

export const deleteFile = ({
  sshConfig,
  location,
  filename,
  closeDialog,
}) => async (dispatch) => {
  const path = `${location}/${filename}`;
  const reply = await sendWithResponse("delete-file", { sshConfig, path });
  const { error } = reply;
  if (error) return dispatch(addSnackbar("error", error));
  dispatch(addSnackbar("error", "File deleted successfully"));
  dispatch(closeDialog());
  return dispatch(getState());
};

export const overrideFile = ({
  sshConfig,
  tempDir,
  remoteDir,
  filename,
  content,
}) => async (dispatch) => {
  const { error } = await sendWithResponse("override-file", {
    sshConfig,
    tempDir,
    remoteDir,
    filename,
    content,
  });
  if (error) return console.log("error: ", error);
  dispatch(addSnackbar("error", "The file has been successfully overriden"));
  dispatch(closeEditor());
  return dispatch(getState());
};
