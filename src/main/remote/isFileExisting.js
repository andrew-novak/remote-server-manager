import Client from "ssh2-sftp-client";

import options from "./connectOptions";

export default async (path) => {
  const sftp = new Client();
  await sftp.connect(options);
  let exists;
  let type;
  let error;
  try {
    const result = await sftp.exists(path);
    if (result) {
      if (result === "d") type = "dir";
      if (result === "l") type = "link";
      if (result === "-") type = "file";
      exists = true;
    } else {
      exists = false;
    }
  } catch (err) {
    error = err.message;
  }
  return { exists, type, error };
};
