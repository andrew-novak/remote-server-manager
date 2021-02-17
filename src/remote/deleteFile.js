import Client from "ssh2-sftp-client";

import options from "./connectOptions";

export default async (path) => {
  const sftp = new Client();
  await sftp.connect(options);
  let error;
  try {
    await sftp.delete(path);
  } catch (err) {
    error = err.message;
  }
  return error;
};
