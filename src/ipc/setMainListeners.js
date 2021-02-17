import getState from "./mainListeners/getState";
import sendFiles from "./mainListeners/sendFiles";
import deleteFile from "./mainListeners/deleteFile";
import getFileText from "./mainListeners/getFileText";
import overrideFile from "./mainListeners/overrideFile";

export default () => {
  try {
    getState();
    sendFiles();
    deleteFile();
    getFileText();
    overrideFile();
  } catch (err) {
    throw new Error(err);
  }
};
