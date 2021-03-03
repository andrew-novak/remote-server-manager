import store from "../../persistentStore";
import validateConfig from "../../helpers/validateConfig";

export default async ({ reply }) => {
  store.delete("config");
  const config = store.get("config");
  const { error } = await validateConfig(config);
  if (error) {
    store.delete("config");
    return reply({ error: "Incorrect saved configuration" });
  }
  return reply({ config });
};
