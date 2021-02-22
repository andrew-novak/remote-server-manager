import { sendWithResponse } from "../ipc";
import {
  CONFIG_SET,
  CONFIG_NOT_FOUND,
  CONFIG_RESTART,
} from "../constants/actionTypes";

export const setConfig = ({
  host,
  username,
  privateKey,
  temporary,
  config: configDir,
  static: staticDir,
}) => async (dispatch) => {
  const config = {
    ssh: { host, username, privateKey },
    temporary,
    sections: { config: configDir, static: staticDir },
  };
  const { error } = await sendWithResponse("set-config", { config });
  if (error) return console.log("error: ", error);
  return dispatch({ type: CONFIG_SET, config });
};

export const getConfig = () => async (dispatch) => {
  const { error, config } = await sendWithResponse("get-config");
  if (error) return console.log("error: ", error);
  if (!config) return dispatch({ type: CONFIG_NOT_FOUND });
  return dispatch({ type: CONFIG_SET, config });
};

// eslint-disable-next-line import/prefer-default-export
export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
