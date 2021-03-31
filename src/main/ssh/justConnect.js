import { Client } from "ssh2";

import ssh2DataToArray from "./ssh2DataToArray";
import prepOptions from "./prepOptions";

export default (sshOptions) =>
  new Promise((resolve) => {
    if (!sshOptions) resolve({ error: "Pass all required arguments" });
    const ssh2 = new Client();
    ssh2
      .on("ready", () => {
        ssh2.exec("uptime", (err, stream) => {
          if (err) resolve({ error: err.message });
          stream
            .on("close", () => ssh2.end())
            .on("data", () => resolve({}))
            .stderr.on("data", (data) => {
              const arr = ssh2DataToArray(data, ": ");
              const error = arr[2];
              resolve({ error });
            });
        });
      })
      .connect(prepOptions(sshOptions));
  });
