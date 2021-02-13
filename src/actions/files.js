import { SET_ALL_FILENAMES } from "../constants/actionTypes";
import { add as addSnackbar } from "./snackbars";
import { clear as clearDropzone } from "./dropzones";
import { ipcListen, ipcSend } from "../ipc";

export const getState = () => (dispatch) => {
  ipcListen("get-state-reply", ({ sections, error }) => {
    if (error) return console.log("error: ", error);
    return dispatch({ type: SET_ALL_FILENAMES, sections });
  });
  ipcSend("get-state");
};

export const sendFiles = (section, files) => (dispatch) => {
  ipcListen("send-files-reply", ({ isSuccessful, error }) => {
    if (!isSuccessful) {
      return dispatch(addSnackbar(error));
    }
    dispatch(addSnackbar("Files addded successfully"));
    dispatch(clearDropzone(section));
    return dispatch(getState());
  });
  const reducedFiles = files.map((file) => ({
    name: file.name,
    path: file.path,
  }));
  ipcSend("send-files", { files: reducedFiles, section });
};

export const deleteFile = (section, filename, closeDialog) => (dispatch) => {
  ipcListen("delete-file-reply", ({ error }) => {
    if (error) {
      return dispatch(addSnackbar(error));
    }
    dispatch(addSnackbar("File deleted successfully"));
    dispatch(closeDialog());
    return dispatch(getState());
  });
  ipcSend("delete-file", { section, filename });
};
