import { sendWithResponse } from "../ipc/renderer";
import { CONFIG_SET, CONFIG_RESTART } from "../constants/actionTypes";

export const getConfig = () => async (dispatch) => {
  const { error, config } = await sendWithResponse("get-config");
  /*
  if (error) return console.log("error: ", error);
  return dispatch({ type: CONFIG_SET, config });*/
};

// eslint-disable-next-line import/prefer-default-export
export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
