import fs from "fs";

import sendFiles from "../../ssh/sendFiles";

export default async ({
  reply,
  sshConfig,
  tempDir,
  remoteDir,
  filename,
  content,
}) => {
  const local = `${tempDir}/${filename}`;
  try {
    await fs.promises.writeFile(local, content);
  } catch (error) {
    if (error) return reply({ error });
  }
  const remote = `${remoteDir}/${filename}`;
  const file = { local, remote };
  const error = await sendFiles(sshConfig, file);
  await fs.promises.unlink(local);
  if (error) return reply({ error });
  return reply();
};
