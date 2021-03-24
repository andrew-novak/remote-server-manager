import { Client } from "ssh2";

import prepOptions from "./prepOptions";

export default (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  return new Promise((resolve) => {
    try {
      const ssh = new Client();
      ssh
        .on("ready", () => {
          console.log("Client :: ready");

          const cmd = `bash ${path}`;

          ssh.exec(cmd, (err, stream) => {
            if (err) throw err;
            stream
              .on("close", (code, signal) => {
                console.log(
                  `SSH Stream :: close :: code: ${code}, signal: ${signal}`
                );
                ssh.end();
                resolve({});
              })
              .on("data", (data) => {
                console.log(`STDOUT: ${data}`);
              })
              .stderr.on("data", (data) => {
                console.log(`STDERR: ${data}`);
              });
          });
        })
        .connect(prepOptions(sshOptions));
    } catch (err) {
      resolve({ error: err.message });
    }
  });
};
