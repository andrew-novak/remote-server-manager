import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (options, path) => {
  const sftp = new Client();
  await sftp.connect(prepOptions(options));
  let error;
  try {
    await sftp.delete(path);
  } catch (err) {
    error = err.message;
  }
  return error;
};
