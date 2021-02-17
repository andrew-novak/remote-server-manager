import Client from "ssh2-sftp-client";

import options from "./connectOptions";
import asyncForEach from "../helpers/asyncForEach";

export default async (files) => {
  const sftp = new Client();
  await sftp.connect(options);
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
