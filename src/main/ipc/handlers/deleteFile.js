import isFileExisting from "../../ssh/isFileExisting";
import deleteFile from "../../ssh/deleteFile";

export default async ({ sshConfig, path, reply }) => {
  const { error, exists } = await isFileExisting(path);
  if (error) {
    return reply({ error });
  }
  if (!exists) {
    return reply({ error: `The file ${path} does not exist` });
  }
  const deleteError = await deleteFile(sshConfig, path);
  if (deleteError) {
    return reply({ error: deleteError });
  }
  return reply({ success: true });
};
