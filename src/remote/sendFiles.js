import Client from "ssh2-sftp-client";

import options from "./connectOptions";
import asyncForEach from "../helpers/asyncForEach";

const sendFiles = async (files) => {
  const sftp = new Client();
  await sftp.connect(options);
  let error;
  try {
    await asyncForEach(files, ({ local, remote }) =>
      sftp.fastPut(local, remote)
    );
  } catch (err) {
    error = err.message;
  }
  sftp.end();
  return error;
};

export default sendFiles;
