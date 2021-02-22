const { ipcRenderer } = window.require("electron");

export const sendWithResponse = (channel, args = {}) =>
  new Promise((resolve, reject) => {
    const replyChannel = `${channel}-reply`;

    const handler = (event, reply = {}) => {
      ipcRenderer.removeListener(replyChannel, handler);
      resolve(reply);
    };

    ipcRenderer.on(replyChannel, handler);

    ipcRenderer.send(channel, args);

    setTimeout(() => {
      ipcRenderer.removeListener(replyChannel, handler);
      reject();
    }, 10000);
  });

export const sendNoResponse = (channel, args = {}) =>
  ipcRenderer.send(channel, args);
