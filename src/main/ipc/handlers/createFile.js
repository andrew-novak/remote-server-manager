import fs from "fs";

import isFileExisting from "../../ssh/isFileExisting";
import sendFiles from "../../ssh/sendFiles";

export default async ({
  sshConfig,
  filename,
  content,
  tempDir,
  targetDir,
  reply,
}) => {
  const tempFull = `${tempDir}/${filename}`;
  const targetFull = `${targetDir}/${filename}`;

  // check remote
  {
    const { error, exists } = await isFileExisting(sshConfig, targetFull);
    if (error) return reply({ error });
    if (exists)
      return reply({
        error: `File with name ${filename} already exists in the ${targetDir} section`,
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
  {
    const file = { local: tempFull, remote: targetFull };
    const error = await sendFiles(sshConfig, file);
    if (error) {
      return reply({ error });
    }
  }

  // delete temporary
  try {
    await fs.promises.unlink(tempFull);
  } catch (err) {
    return reply({ error: err.message });
  }

  return reply();
};
