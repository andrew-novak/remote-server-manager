import { ipcMain } from "electron";

import getConfig from "./handlers/getConfig";
import getState from "./handlers/getState";
import sendFiles from "./handlers/sendFiles";
import deleteFile from "./handlers/deleteFile";
import getFileText from "./handlers/getFileText";
import overrideFile from "./handlers/overrideFile";

const handlers = {
  "delete-file": deleteFile,
  "get-config": getConfig,
  "get-file-text": getFileText,
  "get-state": getState,
  "override-file": overrideFile,
  "send-files": sendFiles,
};

export default (store) => {
  const locations = store.get("locations");
  try {
    Object.entries(handlers).forEach(([channel, handler]) => {
      ipcMain.on(channel, (event, data = {}) => {
        const replyChannel = `${channel}-reply`;
        const reply = (replyData) event.reply(replyChannel, replyData);
        handler(data, reply);
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};
