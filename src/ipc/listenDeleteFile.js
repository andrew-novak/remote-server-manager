import setIpcListener from "./setIpcListener";
import { sections } from "../../settings";
import isFileExisting from "../remote/isFileExisting";
import deleteFile from "../remote/deleteFile";

const listenDeleteFile = () => {
  setIpcListener("delete-file", async (reply, { section, filename }) => {
    const path = `${sections[section].location}/${filename}`;
    const isExisting = await isFileExisting(path);
    if (isExisting.error) {
      return reply({ error: isExisting.error });
    }
    if (!isExisting.bool) {
      return reply({ error: `The file ${path} does not exist` });
    }
    const error = await deleteFile(path);
    if (error) {
      return reply({ error });
    }
    return reply({ success: true });
  });
};

export default listenDeleteFile;
