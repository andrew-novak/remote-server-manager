import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (options, path) => {
  const sftp = new Client();
  await sftp.connect(prepOptions(options));
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
