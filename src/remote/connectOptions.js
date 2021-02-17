import { readFileSync } from "fs";

import { ssh } from "../../settings";

const { host, username, privateKey } = ssh;

export default {
  host,
  port: 22,
  username,
  privateKey: readFileSync(privateKey),
};
