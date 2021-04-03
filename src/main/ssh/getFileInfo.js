import { Client } from "ssh2";

import ssh2DataToArray from "./ssh2DataToArray";
import prepOptions from "./prepOptions";

const formatType = (char) => {
  if (char === "d") return "dir";
  if (char === "l") return "link";
  if (char === "-") return "file";
  return null;
};

const formatPermissions = (string) => {
  if (string.length !== 9) return null;
  const arr = [];
  for (let char = 0; char < string.length; char += 1) {
    const bool = char !== "-";
    arr.push(bool);
  }
  return {
    owner: {
      read: arr[0],
      write: arr[1],
      execute: arr[2],
    },
    group: {
      read: arr[3],
      write: arr[4],
      execute: arr[5],
    },
    others: {
      read: arr[6],
      write: arr[7],
      execute: arr[8],
    },
  };
};

export default (sshOptions, path) =>
  new Promise((resolve) => {
    if (!sshOptions || !path) resolve({ error: "Pass all required arguments" });
    const ssh2 = new Client();
    ssh2
      .on("ready", () => {
        ssh2.exec(`ls -ld ${path}`, (err, stream) => {
          if (err) resolve({ error: err.message });
          stream.on("close", () => ssh2.end());
          stream.on("data", (data) => {
            const arr = ssh2DataToArray(data, " ");
            resolve({
              type: formatType(arr[0][0]),
              permissions: formatPermissions(arr[0].slice(1)),
              owner: {
                user: arr[2],
                group: arr[3],
              },
              filename: arr[8],
            });
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
