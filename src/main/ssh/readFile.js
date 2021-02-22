import Client from "ssh2-promise";

import prepOptions from "./prepOptions";

export default async (options, path) => {
  let error;
  let content;
  try {
    const ssh = new Client(prepOptions(options));
    await ssh.connect();
    content = await ssh.exec(`cat ${path}`);
  } catch (err) {
    error = err.toString();
  }
  return { error, content };
};
