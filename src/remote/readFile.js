import Client from "ssh2-promise";

import options from "./connectOptions";

export default async (path) => {
  let error;
  let content;
  try {
    const ssh = new Client(options);
    await ssh.connect();
    content = await ssh.exec(`cat ${path}`);
  } catch (err) {
    error = err.toString();
  }
  return { error, content };
};
