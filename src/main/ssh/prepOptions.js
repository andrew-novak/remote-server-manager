import { readFileSync } from "fs";

export default ({ host, username, privateKey }) => ({
  host,
  port: 22,
  username,
  privateKey: readFileSync(privateKey),
  agent: process.env.SSH_AUTH_SOCK,
  agentForward: true,
});
