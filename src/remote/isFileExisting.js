import Client from "ssh2-sftp-client";

import options from "./connectOptions";

const isFileExisting = async (path) => {
  const sftp = new Client();
  await sftp.connect(options);
  let bool;
  let error;
  try {
    const returned = await sftp.exists(path);
    bool = returned !== false;
  } catch (err) {
    error = err.message;
  }
  return { bool, error };
};

export default isFileExisting;
