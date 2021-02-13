import Client from "ssh2-sftp-client";

import options from "./connectOptions";

const deleteFile = async (path) => {
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

export default deleteFile;
