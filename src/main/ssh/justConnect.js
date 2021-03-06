import Client from "ssh2-promise";

import prepOptions from "./prepOptions";

export default async (sshOptions) => {
  if (!sshOptions) return { error: "Pass all required arguments" };
  try {
    const ssh = new Client(prepOptions(sshOptions));
    await ssh.connect();
  } catch (err) {
    return { error: err.toString() };
  }
  return {};
};
