import saveToTmp from "../../helpers/saveToTmp";
import store from "../../persistentStore";
import validateConfig from "../../helpers/validateConfig";

export default async ({ reply }) => {
  saveToTmp();
  const config = store.get("config");

  const { error } = await validateConfig(config);

  if (error) {
    store.delete("config");
    return reply({ error: "Incorrect saved configuration" });
  }

  return reply({ config });
};
