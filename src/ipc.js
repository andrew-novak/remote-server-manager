const { ipcRenderer } = window.require("electron");

export const ipcListen = (channel, callback) => {
  ipcRenderer.on(channel, function handler(event, reply) {
    ipcRenderer.removeListener(channel, handler);
    callback(reply);
  });
};

export const ipcSend = (channel, data) => {
  ipcRenderer.send(channel, data);
};
