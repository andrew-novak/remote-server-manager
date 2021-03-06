import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  const sftp = new Client();
  try {
    await sftp.connect(prepOptions(sshOptions));
    const result = await sftp.exists(path);
    let exists;
    let type;
    if (result) {
      exists = true;
      if (result === "d") type = "dir";
      if (result === "l") type = "link";
      if (result === "-") type = "file";
    } else {
      exists = false;
    }
    return { exists, type };
  } catch (err) {
    return { error: err.message };
  }
};
