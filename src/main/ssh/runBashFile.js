import { Client } from "ssh2";

import ssh2DataFromData from "./ssh2DataToArray";
import prepOptions from "./prepOptions";

export default (sshOptions, path) =>
  new Promise((resolve) => {
    if (!sshOptions || !path) resolve({ error: "Pass all required arguments" });
    const ssh2 = new Client();
    ssh2.on("error", (err) => resolve({ error: err.message }));
    ssh2
      .on("ready", () => {
        ssh2.exec(`bash ${path}`, (err, stream) => {
          if (err) resolve({ error: err.message });
          stream.on("close", (code, signal) => {
            console.log(
              `ssh2 Stream :: close :: code: ${code}, signal: ${signal}`
            );
            ssh2.end();
            resolve({});
          });
          stream.on("data", (data) => console.log(`STDOUT: ${data}`));
          stream.stderr.on("data", (data) => {
            const arr = ssh2DataFromData(data, ": ");
            const error = arr[2];
            resolve({ error });
          });
        });
      })
      .connect(prepOptions(sshOptions));
  });
