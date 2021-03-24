import ipcSend from "../ipc/send";
import store from "../persistentStore";
import validateConfig from "../helpers/validateConfig";

export default async (webContents) => {
  const send = (error, config) =>
    ipcSend({
      webContents,
      channel: "go-to-config",
      data: { error, config },
    });

  const config = await store.get("config");
  if (!config) return send();

  const { error } = await validateConfig(config);
  if (error)
    return send({
      error: "A problem occured with the current configuration",
    });
  return send({ config });
};
