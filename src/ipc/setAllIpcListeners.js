import listenGetState from "./listenGetState";
import listenSendFiles from "./listenSendFiles";
import listenDeleteFile from "./listenDeleteFile";

const setAllIPCListeners = () => {
  try {
    listenGetState();
    listenSendFiles();
    listenDeleteFile();
  } catch (err) {
    throw new Error(err);
  }
};

export default setAllIPCListeners;
