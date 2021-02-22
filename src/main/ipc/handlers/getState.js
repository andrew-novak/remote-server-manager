import getDirContent from "../../ssh/getDirContent";

export default async ({ sshConfig, sectionPaths, reply }) => {
  const sections = {};
  const checks = [];

  const addCheck = async (section, location) => {
    const { filenames, error } = await getDirContent(sshConfig, location);
    if (error) throw error;
    sections[section] = filenames;
  };

  Object.entries(sectionPaths).forEach(([section, location]) => {
    checks.push(addCheck(section, location));
  });

  Promise.all(checks)
    .then(() => reply({ sections }))
    .catch((error) => reply({ error }));
};
