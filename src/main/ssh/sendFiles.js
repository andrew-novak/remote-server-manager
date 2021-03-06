import Client from "ssh2-sftp-client";

import prepOptions from "./prepOptions";
import asyncForEach from "../helpers/asyncForEach";

export default async (sshOptions, files) => {
  if (!sshOptions || !files) return { error: "Pass all required arguments" };
  const sftp = new Client();
  try {
    await sftp.connect(prepOptions(sshOptions));
    if (Array.isArray(files)) {
      await asyncForEach(files, ({ local, remote }) => {
        if (!local) throw new Error("No local address passed");
        if (!remote) throw new Error("No remote address passed");
        sftp.fastPut(local, remote);
      });
    } else {
      await sftp.fastPut(files.local, files.remote);
    }
    return null;
  } catch (err) {
    return err.message;
  }
};
