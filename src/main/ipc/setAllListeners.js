import { ipcMain } from "electron";

import createFile from "./handlers/createFile";
import deleteFile from "./handlers/deleteFile";
import getConfig from "./handlers/getConfig";
import getFileText from "./handlers/getFileText";
import getState from "./handlers/getState";
import overrideFile from "./handlers/overrideFile";
import runBashFile from "./handlers/runBashFile";
import sendFiles from "./handlers/sendFiles";
import setConfig from "./handlers/setConfig";

const handlers = {
  "create-file": createFile,
  "delete-file": deleteFile,
  "get-config": getConfig,
  "get-file-text": getFileText,
  "get-state": getState,
  "override-file": overrideFile,
  "run-bash-file": runBashFile,
  "send-files": sendFiles,
  "set-config": setConfig,
};

export default () => {
  try {
    Object.entries(handlers).forEach(([channel, handler]) => {
      ipcMain.on(channel, (event, data = {}) => {
        const replyChannel = `${channel}-reply`;
        const reply = (replyData) => event.reply(replyChannel, replyData);
        handler({ ...data, reply });
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};
