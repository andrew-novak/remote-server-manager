import isFileExisting from "../../ssh/isFileExisting";
import saveToTmp from "../../helpers/saveToTmp";
import sendFiles from "../../ssh/sendFiles";

const validateFilename = (filename) => {
  if (!filename) return "Provide filename";
  return null;
};

export default async ({ sshConfig, filename, content, targetDir, reply }) => {
  const targetFull = `${targetDir}/${filename}`;

  // check filename
  {
    const error = validateFilename(filename);
    if (error) return reply({ errElem: "filename", error });
  }

  // check remote
  {
    const { error, exists } = await isFileExisting(sshConfig, targetFull);
    if (error) return reply({ error });
    if (exists)
      return reply({
        error: `File with name ${filename} already exists in the ${targetDir} section`,
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

  return reply();
};
