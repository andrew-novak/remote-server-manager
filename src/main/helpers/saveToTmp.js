import tmp from "tmp";
import fs from "fs";

export default (content) =>
  new Promise((resolve) =>
    tmp.file(
      { template: "remote-server-manager-XXXXXX" },
      (err, path, fd, clean) => {
        if (err) resolve({ error: err.message });
        fs.writeFile(path, content, async (err) => {
          if (err) resolve({ error: err.message });
          resolve({ path, clean });
        });
      }
    )
  );
