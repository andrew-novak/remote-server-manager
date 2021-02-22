import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";

export default async (options, path) => {
  const sftp = new Client();
  await sftp.connect(prepOptions(options));
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
