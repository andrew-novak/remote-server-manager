import mainListen from "../mainListen";
import { locations } from "../../../settings";
import getDirContent from "../../remote/getDirContent";

export default () =>
  mainListen("get-state", (args, reply) => {
    const results = {};
    const checks = [];

    const addCheck = async (section, location) => {
      const { filenames, error } = await getDirContent(location);
      if (error) throw error;
      results[section] = filenames;
    };

    Object.entries(locations.remote.sections).forEach(([section, location]) => {
      checks.push(addCheck(section, location));
    });

    /*
    Object.entries(sections).forEach(([name, { location }]) => {
      checks.push(addCheck(name, location));
    });
    */

    Promise.all(checks)
      .then(() => reply({ sections: results }))
      .catch((error) => reply({ error }));
  });
