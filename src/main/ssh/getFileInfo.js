import Client from "ssh2-promise";

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

export default async (sshOptions, path) => {
  if (!sshOptions || !path) return { error: "Pass all required arguments" };
  try {
    const ssh = new Client(prepOptions(sshOptions));
    await ssh.connect();
    const result = await ssh.exec(`ls -ld ${path}`);
    const arr = result.split(" ");
    return {
      type: formatType(arr[0][0]),
      permissions: formatPermissions(arr[0].slice(1)),
      owner: {
        user: arr[2],
        group: arr[3],
      },
      filename: arr[8],
    };
  } catch (err) {
    let error = err.toString();
    if (/No such file or directory/.test(error)) error = "Does not exist";
    return { error };
  }
};
