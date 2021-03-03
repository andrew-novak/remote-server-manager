import os from "os";
import fs from "fs";

import justConnect from "../ssh/justConnect";
import getFileInfo from "../ssh/getFileInfo";

const regexes = {
  ip4Addr: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  linuxUsername: /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/,
  linuxAbsPath: /^\/$|^((\/([a-zA-Z0-9_-]+))+)$/,
  winAbsPath: /^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/,
};

const validateSSH = async (ssh) => {
  const { host, username, privateKey } = ssh;

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

  if (!privateKey)
    return {
      errElem: "privateKey",
      error: "Enter an absolute path",
    };

  if (!fs.existsSync(privateKey))
    return {
      errElem: "privateKey",
      error: "File does not exist",
    };

  const { error } = await justConnect(ssh);
  if (error) {
    if (/Unsupported key format/.test(error))
      return {
        errElem: "privateKey",
        error: "Unsupported format",
      };
    return { error: "Unable to connect" };
  }

  return {};
};

const validateTemporary = async (path) => {
  if (!path) return { error: "Enter an absolute path" };

  if (os.platform() === "linux" && !regexes.linuxAbsPath.test(path))
    return { error: "Incorrect path" };

  if (os.platform() === "win32" && !regexes.winAbsPath.test(path))
    return { error: "Incorrect path" };

  try {
    // await fs.promises.access(path, fs.constants.R_OK || fs.contants.W_OK);
  } catch (error) {
    return { error };
  }

  return {};
};

const validateSections = async (ssh, sections) => {
  let errElem;
  let error;

  await Promise.all(
    Object.entries(sections).map(async ([section, path]) => {
      const setErr = (err) => {
        errElem = section;
        throw err;
      };
      if (path === "") return setErr("Enter an absolute path");
      if (path === "/") return setErr("Cannot point to '/'");
      if (/^\/boot/.test(path)) return setErr("Cannot point to '/boot'");
      const { error: err, type, owner } = await getFileInfo(ssh, path);
      if (err) return setErr(err);
      if (type !== "dir") return setErr("Not a directory");
      if (owner.user !== ssh.username) return setErr("Not owned by you");
      return null;
    })
  ).catch((err) => {
    error = err;
  });

  return { errElem, error };
};

export default async (config) => {
  if (
    config == null ||
    config.ssh == null ||
    config.ssh.host == null ||
    config.ssh.username == null ||
    config.ssh.privateKey == null ||
    config.temporary == null ||
    config.sections == null ||
    config.sections.config == null ||
    config.sections.static == null
  )
    return { error: "The configuration is incomplete" };

  const { ssh, temporary, sections } = config;

  if (os.platform() !== "linux" && os.platform() !== "win32")
    return { error: "Currently, only Windows and Linux is supported" };

  {
    const { errElem, error } = await validateSSH(ssh);
    if (error) return { errElem, error };
  }
  {
    const { error } = await validateTemporary(temporary);
    if (error) return { errElem: "temporary", error };
  }
  {
    const { errElem, error } = await validateSections(ssh, sections);
    if (error) return { errElem, error };
  }

  return { error: "Valid, but return error for now" };
  // return { isOk };
};
