import Client from "ssh2-promise";

import prepOptions from "./prepOptions";

export default async (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  try {
    const ssh = new Client(prepOptions(sshOptions));
    await ssh.connect();
    const content = await ssh.exec(`cat "${path}"`);
    return { content };
  } catch (err) {
    return { error: err.message };
  }
};
