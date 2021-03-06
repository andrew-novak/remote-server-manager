import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  const sftp = new Client();
  try {
    await sftp.connect(prepOptions(sshOptions));
    const files = await sftp.list(path);
    const filenames = files.map((file) => file.name);
    return { filenames };
  } catch (err) {
    return { error: err.message };
  }
};
