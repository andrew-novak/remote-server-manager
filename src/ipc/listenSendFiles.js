import setIpcListener from "./setIpcListener";
import { sections } from "../../settings";
import getDirContent from "../remote/getDirContent";
import sendFiles from "../remote/sendFiles";

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

const listenSendFiles = () => {
  setIpcListener("send-files", async (reply, { files, section }) => {
    const filenames = files.map((file) => file.path);
    const targetDir = sections[section].location;
    const { filenames: remoteFilenames, error } = await getDirContent(
      targetDir
    );
    if (error) return reply({ error });
    const doubles = getDoubles(filenames, remoteFilenames);
    if (doubles.length !== 0) {
      return reply({
        error: `The following filenames already exist: ${doubles}`,
      });
    }
    const paths = files.map((file) => ({
      local: file.path,
      remote: `${targetDir}/${file.name}`,
    }));
    const sendError = await sendFiles(paths);
    return reply({
      isSuccessful: !sendError,
      error: sendError,
    });
  });
};

export default listenSendFiles;
