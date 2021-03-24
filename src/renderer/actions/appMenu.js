import { listen } from "../ipc";

// eslint-disable-next-line import/prefer-default-export
export const setMenuListeners = (redirect) => (dispatch) =>
  listen("go-to-config", () => redirect("/config"));
