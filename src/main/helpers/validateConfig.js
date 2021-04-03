import os from "os";

import justConnect from "../ssh/justConnect";
import getFileInfo from "../ssh/getFileInfo";

const regexes = {
  ip4Addr: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  linuxUsername: /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/,
  linuxAbsPath: /^\/$|^((\/([a-zA-Z0-9_-]+))+)$/,
  // eslint-disable-next-line no-useless-escape
  winAbsPath: /^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/,
};

const validateSSH = async (ssh) => {
  const { host, username } = ssh;

  if (!host) return { errElem: "host", error: "Enter IPv4 address" };

  if (!regexes.ip4Addr.test(host))
    return {
      errElem: "host",
      error: "Invalid IPv4 address",
    };

  if (!username) return { errElem: "username", error: "Enter username" };

  if (!regexes.linuxUsername.test(username))
    return {
      errElem: "username",
      error: "Invalid username",
    };

  const { error } = await justConnect(ssh);
  if (error) {
    if (/Unsupported key format/.test(error))
      return {
        error: "Unsupported SSH private key format",
      };
    return { error: "Unable to connect" };
  }

  return {};
};

const validateSections = async (ssh, sections) => {
  const entries = Object.entries(sections);

  // It is intended to check one section after another
  for (let i = 0; i < entries.length; i += 1) {
    const [name, path] = entries[i];

    const error = (message) => ({
      errElem: name,
      error: message,
    });

    if (path === "") return error("Enter an absolute path");
    if (path === "") return error("Enter an absolute path");
    if (path === "/") return error("Cannot point to '/'");
    if (/^\/boot/.test(path)) return error("Cannot point to '/boot'");
    // eslint-disable-next-line no-await-in-loop
    const { error: err, type, owner } = await getFileInfo(ssh, path);
    if (err) return error(err);
    if (type !== "dir") return error("Not a directory");
    if (owner.user !== ssh.username) return error("Not owned by you");
  }

  return {};
};

export default async (config) => {
  if (!config) return { error: "No configuration found" };
  if (
    config.ssh == null ||
    config.ssh.host == null ||
    config.ssh.username == null ||
    config.sections == null ||
    config.sections.config == null ||
    config.sections.static == null ||
    config.sections.nodeApis == null ||
    config.sections.deploy == null
  )
    return { error: "The configuration is incomplete" };

  const { ssh, sections } = config;

  if (os.platform() !== "linux" && os.platform() !== "win32")
    return { error: "Currently, only Windows and Linux is supported" };

  {
    const { errElem, error } = await validateSSH(ssh);
    if (error) return { errElem, error };
  }
  {
    const { errElem, error } = await validateSections(ssh, sections);
    if (error) return { errElem, error };
  }

  return {};
};
