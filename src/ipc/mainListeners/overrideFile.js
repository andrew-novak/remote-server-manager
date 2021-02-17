import fs from "fs";

import mainListen from "../mainListen";
import { locations } from "../../../settings";
import sendFiles from "../../remote/sendFiles";

export default () =>
  mainListen("override-file", async (args, reply) => {
    const { section, filename, content } = args;
    const local = `${locations.local.temporary}/${filename}`;
    try {
      await fs.promises.writeFile(local, content);
    } catch (error) {
      if (error) return reply({ error });
    }
    const remote = `${locations.remote.sections[section]}/${filename}`;
    const file = { local, remote };
    const error = await sendFiles(file);
    await fs.promises.unlink(local);
    if (error) return reply({ error });
    return reply();
  });
