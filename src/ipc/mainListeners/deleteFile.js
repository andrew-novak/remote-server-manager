import mainListen from "../mainListen";
import { locations } from "../../../settings";
import isFileExisting from "../../remote/isFileExisting";
import deleteFile from "../../remote/deleteFile";

export default () =>
  mainListen("delete-file", async (args, reply) => {
    const { section, filename } = args;
    const path = `${locations.remote.sections[section]}/${filename}`;
    const { error, exists } = await isFileExisting(path);
    if (error) {
      return reply({ error });
    }
    if (!exists) {
      return reply({ error: `The file ${path} does not exist` });
    }
    const deleteError = await deleteFile(path);
    if (deleteError) {
      return reply({ error: deleteError });
    }
    return reply({ success: true });
  });
