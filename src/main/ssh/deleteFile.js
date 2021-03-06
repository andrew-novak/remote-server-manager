import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  const sftp = new Client();
  try {
    await sftp.connect(prepOptions(sshOptions));
    await sftp.delete(path);
  } catch (err) {
    return err.message;
  }
  return null;
};
