import Store from "electron-store";

const schema = {
  settings: null,
};

export default new Store(schema);
