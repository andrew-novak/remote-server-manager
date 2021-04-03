import isFileExisting from "../../ssh/isFileExisting";
import saveToTmp from "../../helpers/saveToTmp";
import sendFiles from "../../ssh/sendFiles";
import deleteFile from "../../ssh/deleteFile";

export default async ({
  reply,
  sshConfig,
  originalFilename,
  filename,
  content,
  targetDir,
}) => {
  const sameName = originalFilename === filename;
  const oldTargetFull = `${targetDir}/${originalFilename}`;
  const targetFull = `${targetDir}/${filename}`;

  // check remote
  {
    const { error, exists } = await isFileExisting(sshConfig, targetFull);
    if (error) return reply({ error });
    if (sameName && !exists)
      return reply({ error: "Not able to override a non-existent file" });
    if (!sameName && exists)
      return reply({
        error: `A different file with name ${filename} already exists`,
      });
  }

  // create tmp
  const { error, path, clean } = await saveToTmp(content);
  if (error) return reply({ error });
  // send
  {
    const file = { local: path, remote: targetFull };
    const error = await sendFiles(sshConfig, file);
    if (error) return reply({ error });
  }
  // delete tmp
  clean();

  // delete old remote
  if (!sameName) {
    const error = await deleteFile(sshConfig, oldTargetFull);
    if (error) return reply({ error });
  }

  return reply();
};
