import "regenerator-runtime/runtime";
import path from "path";
import os from "os";
import prompts from "prompts";
import fs from "fs";

// "start:renderer": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.renderer.dev.babel.js",
// "start:renderer": "node -r @babel/register ./scripts/start"
const questions = [
  {
    type: "text",
    name: "host",
    message: "Remote host address",
  },
  {
    type: "text",
    name: "username",
    message: "Remote username",
  },
  {
    type: "text",
    name: "config",
    message: "Remote Nginx conf.d path",
    initial: "/etc/nginx/conf.d",
  },
  {
    type: "text",
    name: "static",
    message: "Remote Nginx static-content directory path",
    initial: "/usr/share/nginx/static",
  },
  {
    type: "text",
    name: "privateKey",
    message: "Local SSH private key path",
    initial: path.join(os.userInfo().homedir, ".ssh", "id_rsa"),
  },
  {
    type: "text",
    name: "temporary",
    message: "Local temporary-content directory path",
    initial: path.join(__dirname, "..", "temporary"),
  },
];

const template = export const locations = {
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

const template = `export const locations={

}`;


(async () => {
  try {
    const settingsPath = path.join(__dirname, "../settings.js");
    if (!fs.existsSync(settingsPath)) {
      const responses = await prompts(questions);
      fs.writeFileSync(settingsPath, );
    }
  } catch (err) {
    console.log(err);
  }
})();
