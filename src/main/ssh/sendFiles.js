import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";
import asyncForEach from "../helpers/asyncForEach";

export default async (options, files) => {
  const sftp = new Client();
  await sftp.connect(prepOptions(options));
  let error;
  try {
    if (Array.isArray(files)) {
      await asyncForEach(files, ({ local, remote }) =>
        sftp.fastPut(local, remote)
      );
    } else {
      await sftp.fastPut(files.local, files.remote);
    }
  } catch (err) {
    error = err.message;
  }
  sftp.end();
  return error;
};
