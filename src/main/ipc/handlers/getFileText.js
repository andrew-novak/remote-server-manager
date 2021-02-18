import mainListen from "../mainListen";
import { locations } from "../../../settings";
import isFileExisting from "../../remote/isFileExisting";
import readFile from "../../remote/readFile";

export default () =>
  mainListen("get-file-text", async (args, reply) => {
    const { section, filename } = args;
    const location = locations.remote.sections[section];
    const path = `${location}/${filename}`;
    {
      const { error, exists, type } = await isFileExisting(path);
      if (error) return reply({ error });
      if (!exists) return reply({ error: "This file does not exist." });
      if (type !== "file") return reply({ error: "This is not a file." });
    }
    const { error, content } = await readFile(path);
    return reply({ error, content });
  });
