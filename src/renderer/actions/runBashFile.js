import { sendWithResponse } from "../ipc";
import { add as addSnackbar } from "./snackbars";

export default ({ sshConfig, location, filename }) => async (dispatch) => {
  try {
    // const { error } = await sendWithResponse("run-bash-file", {
    const channel = "run-bash-file";
    const data = { sshConfig, location, filename };
    const options = { maxResWaitTime: 420000 };
    const { error /* , output */ } = await sendWithResponse({
      channel,
      data,
      options,
    });
    if (error) return dispatch(addSnackbar("error", error));
    return dispatch(addSnackbar("info", "The script has finished running"));
  } catch (err) {
    return dispatch(addSnackbar("error", err.message));
  }
};
