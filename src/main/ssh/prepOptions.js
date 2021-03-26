export default ({ host, username }) => ({
  host,
  port: 22,
  username,
  agent: process.env.SSH_AUTH_SOCK,
  agentForward: true,
});
