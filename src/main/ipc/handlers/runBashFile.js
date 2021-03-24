import runBashFile from "../../ssh/runBashFile";

export default async ({ sshConfig, location, filename, reply }) => {
  const path = `${location}/${filename}`;
  const { error } = await runBashFile(sshConfig, path);
  if (error) return reply({ error });
  return reply();
};
