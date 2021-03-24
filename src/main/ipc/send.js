export default ({ webContents, channel, data = {} }) => {
  webContents.send(channel, data);
};
