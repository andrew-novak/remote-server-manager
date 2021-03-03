import validateConfig from "../../helpers/validateConfig";
import store from "../../persistentStore";

export default async ({ reply, config }) => {
  const { error, errElem } = await validateConfig(config);
  if (error) {
    return reply({ error, errElem });
  }
  store.set("config", config);
  return reply();
};
