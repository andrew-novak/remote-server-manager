import Client from "ssh2-sftp-client";

import options from "./connectOptions";

const getDirContent = async (path) => {
  const sftp = new Client();
  await sftp.connect(options);
  let files;
  let filenames;
  let error;
  try {
    files = await sftp.list(path);
    filenames = files.map((file) => file.name);
  } catch (err) {
    error = err.message;
  }
  return { filenames, error };
};

export default getDirContent;
