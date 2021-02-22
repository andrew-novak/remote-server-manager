import Store from "electron-store";

const schema = {
  config: null,
};

export default new Store(schema);
