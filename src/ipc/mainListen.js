import { ipcMain } from "electron";

export default (channel, task) => {
  ipcMain.on(channel, (event, data = {}, arg3) => {
    if (arg3)
      throw new Error(
        "3th argument detected. Pass all arguments encapsulated in an object as the 2nd argument."
      );
    const reply = (replyData) => event.reply(`${channel}-reply`, replyData);
    task(data, reply);
  });
};
