import isFileExisting from "../../ssh/isFileExisting";
import deleteFile from "../../ssh/deleteFile";

export default async ({ sshConfig, path, reply }) => {
  {
    const { error, exists } = await isFileExisting(sshConfig, path);
    if (error) return reply({ error });
    if (!exists) return reply({ error: `The file ${path} does not exist` });
  }

  {
    const error = await deleteFile(sshConfig, path);
    if (error) return reply({ error });
  }

  return reply();
};
