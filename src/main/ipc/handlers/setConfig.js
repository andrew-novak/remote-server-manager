import isConfigOk from "../../helpers/isConfigOk";
import store from "../../persistentStore";

export default ({ reply, config }) => {
  if (!isConfigOk(config))
    return reply({ error: "The configuration is not correct" });
  store.set("config", config);
  return reply();
};
