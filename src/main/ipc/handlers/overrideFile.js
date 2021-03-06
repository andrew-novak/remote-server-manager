import fs from "fs";

import isFileExisting from "../../ssh/isFileExisting";
import sendFiles from "../../ssh/sendFiles";
import deleteFile from "../../ssh/deleteFile";

export default async ({
  reply,
  sshConfig,
  originalFilename,
  filename,
  content,
  tempDir,
  targetDir,
}) => {
  const sameName = originalFilename === filename;
  const tempFull = `${tempDir}/${filename}`;
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

  // check temporary
  try {
    const exists = fs.existsSync(tempFull);
    if (exists)
      return reply({
        error: `A file wth name ${filename} already exists in the temporary directory`,
      });
  } catch (err) {
    return reply({ error: err.message });
  }

  // create temporary
  try {
    await fs.promises.writeFile(tempFull, content);
  } catch (err) {
    return reply({ error: err.message });
  }

  // send
  const file = { local: tempFull, remote: targetFull };
  const error = await sendFiles(sshConfig, file);
  if (error) return reply({ error });

  // delete old remote
  if (!sameName) {
    const error = await deleteFile(sshConfig, oldTargetFull);
    if (error) return reply({ error });
  }

  // delete temporary
  try {
    await fs.promises.unlink(tempFull);
  } catch (error) {
    return reply({ error });
  }

  return reply();
};
