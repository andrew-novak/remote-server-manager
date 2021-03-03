import Client from "ssh2-promise";

import prepOptions from "./prepOptions";

export default async (options) => {
  try {
    const ssh = new Client(prepOptions(options));
    await ssh.connect();
  } catch (err) {
    return { error: err.toString() };
  }
  return {};
};
