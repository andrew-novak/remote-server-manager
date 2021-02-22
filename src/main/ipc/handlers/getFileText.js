import isFileExisting from "../../ssh/isFileExisting";
import readFile from "../../ssh/readFile";

export default async ({ sshConfig, path, reply }) => {
  {
    const { error, exists, type } = await isFileExisting(sshConfig, path);
    if (error) return reply({ error });
    if (!exists) return reply({ error: "This file does not exist." });
    if (type !== "file") return reply({ error: "This is not a file." });
  }
  const { error, content } = await readFile(sshConfig, path);
  return reply({ error, content });
};
