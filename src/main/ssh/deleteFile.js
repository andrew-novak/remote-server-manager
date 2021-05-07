import { Client } from "ssh2";

import ssh2DataToArray from "./ssh2DataToArray";
import prepOptions from "./prepOptions";

export default (sshOptions, path) =>
  new Promise((resolve) => {
    if (!sshOptions || !path) resolve({ error: "Pass all required arguments" });
    const ssh2 = new Client();
    ssh2
      .on("ready", () => {
        ssh2.exec(`rm -r ${path}`, (err, stream) => {
          if (err) resolve({ error: err.message });
          stream.on("exit", () => {
            ssh2.end();
            resolve();
          });
          stream.stderr.on("data", (data) => {
            const arr = ssh2DataToArray(data, ": ");
            const error = arr[2];
            resolve({ error });
          });
        });
      })
      .connect(prepOptions(sshOptions));
  });
