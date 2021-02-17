import { SET_ALL_FILENAMES } from "../constants/actionTypes";
import { add as addSnackbar } from "./snackbars";
import { clear as clearDropzone } from "./dropzones";
import { sendWithResponse } from "../ipc/renderer";

export const getState = () => async (dispatch) => {
  const reply = await sendWithResponse("get-state");
  const { error, sections } = reply;
  if (error) return console.log("error: ", error);
  return dispatch({ type: SET_ALL_FILENAMES, sections });
};

export const sendFiles = (section, files) => async (dispatch) => {
  const reducedFiles = files.map((file) => ({
    name: file.name,
    path: file.path,
  }));
  const args = { files: reducedFiles, section };
  const reply = await sendWithResponse("send-files", args);
  const { isSuccessful, error } = reply;
  if (!isSuccessful) return dispatch(addSnackbar(error));
  dispatch(addSnackbar("Files addded successfully"));
  dispatch(clearDropzone(section));
  return dispatch(getState());
};

export const deleteFile = (section, filename, closeDialog) => async (
  dispatch
) => {
  const reply = await sendWithResponse("delete-file", { section, filename });
  const { error } = reply;
  if (error) return dispatch(addSnackbar(error));
  dispatch(addSnackbar("File deleted successfully"));
  dispatch(closeDialog());
  return dispatch(getState());
};
