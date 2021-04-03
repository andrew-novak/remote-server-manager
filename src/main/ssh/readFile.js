import { Client } from "ssh2";

import prepOptions from "./prepOptions";

export default (sshOptions, path) =>
  new Promise((resolve) => {
    if (!sshOptions || !path) resolve({ error: "Pass all required arguments" });
    const ssh2 = new Client();
    ssh2.on("error", (err) => resolve({ error: err.message }));
    ssh2
      .on("ready", () =>
        ssh2.exec(`cat "${path}"`, (err, stream) => {
          if (err) resolve({ error: err.message });
          stream.on("close", () => {
            ssh2.end();
            resolve({ content: "" });
          });
          stream.on("data", (data) => resolve({ content: data.toString() }));
          stream.stderr.on("data", (data) => {
            const error = data.toString().split(": ")[2];
            resolve({ error });
          });
        })
      )
      .connect(prepOptions(sshOptions));
  });
