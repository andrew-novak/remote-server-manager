import setIpcListener from "./setIpcListener";
import { sections } from "../../settings";
import getDirContent from "../remote/getDirContent";

const listenGetState = () => {
  setIpcListener("get-state", (reply) => {
    const results = {};
    const checks = [];

    const addCheck = async (name, location) => {
      const { filenames, error } = await getDirContent(location);
      if (error) throw error;
      results[name] = filenames;
    };

    Object.entries(sections).forEach(([name, { location }]) => {
      checks.push(addCheck(name, location));
    });

    Promise.all(checks)
      .then(() => reply({ sections: results }))
      .catch((error) => reply({ error }));
  });
};

export default listenGetState;
