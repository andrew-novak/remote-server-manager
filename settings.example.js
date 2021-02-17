export const locations = {
  local: {
    // path to the dir that will store temporary files
    temporary: `${__dirname}/temporary`,
  },
  remote: {
    sections: {
      config: "path_to_nginx_conf.d_directory",
      static: "path_to_nginx_static_files_directory",
    },
  },
};

export const ssh = {
  privateKey: "absolute_path_to_local_ssh_private_key",
  host: "remote_host_address",
  username: "remote_username",
};
