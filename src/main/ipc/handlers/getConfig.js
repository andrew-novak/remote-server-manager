import store from "../../electronStore";

/*
export default ("delete-file", async (args, reply) => {
  st
});
*/

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
