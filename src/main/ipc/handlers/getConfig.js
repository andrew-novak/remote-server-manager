import store from "../../persistentStore";
import isConfigOk from "../../helpers/isConfigOk";

export default ({ reply }) => {
  store.delete("config");
  const config = store.get("config");
  if (!isConfigOk(config)) return reply({ config: null });
  return reply({ config });
};
