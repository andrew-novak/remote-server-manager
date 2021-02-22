import getDirContent from "../../ssh/getDirContent";
import sendFiles from "../../ssh/sendFiles";

const getDoubles = (arr1, arr2) => {
  if (!arr1 || !arr2) throw new Error("Pass 2 arrays as arguments.");
  const doubles = [];
  arr1.forEach((v1) => {
    arr2.forEach((v2) => {
      if (v1 === v2) doubles.push(v1);
    });
  });
  return doubles;
};

export default async ({ sshConfig, files, remoteDir, reply }) => {
  const filenames = files.map((file) => file.path);
  const { filenames: remoteFilenames, error } = await getDirContent(remoteDir);
  if (error) return reply({ error });
  const doubles = getDoubles(filenames, remoteFilenames);
  if (doubles.length !== 0) {
    return reply({
      error: `The following filenames already exist: ${doubles}`,
    });
  }
  const paths = files.map((file) => ({
    local: file.path,
    remote: `${remoteDir}/${file.name}`,
  }));
  const sendError = await sendFiles(sshConfig, paths);
  return reply({
    isSuccessful: !sendError,
    error: sendError,
  });
};
