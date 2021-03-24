const { ipcRenderer } = window.require("electron");

export const listen = (channel, handler) => {
  ipcRenderer.on(channel, handler);
};

export const send = (channel, data = {}) => ipcRenderer.send(channel, data);

const defaultOptions = {
  maxResWaitTime: 10000,
};

export const sendWithResponse = ({
  channel,
  data = {},
  options = defaultOptions,
}) =>
  new Promise((resolve) => {
    const replyChannel = `${channel}-reply`;

    const handler = (event, reply = {}) => {
      ipcRenderer.removeListener(replyChannel, handler);
      resolve(reply);
    };

    listen(replyChannel, handler);

    send(channel, data);

    setTimeout(() => {
      ipcRenderer.removeListener(replyChannel, handler);
      resolve({
        error: new Error("Max waiting time for main response exedeed"),
      });
    }, options.maxResWaitTime);
  });
