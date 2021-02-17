import { readFileSync } from "fs";

const connectOptions = {
  host: "host_address",
  port: 22,
  username: "remote_username",
  privateKey: readFileSync("absolute_path_to_local_ssh_private_key"),
};

export default connectOptions;
