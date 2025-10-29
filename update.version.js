const child_process = require('child_process');
const fs = require('fs');

const branches = [
  'development',
  'stage',
  'release',
  'main'
];

const mkTemplate = () => {
  const template = {
    user: {
      user: "",
      username: "",
      email: ""
    },
    release: {
      branch: "",
      commit: "",
      version: "0.0.1",
      date: ""
    }
  };

  return template;
}

const shell = (cmd) => {
  try {
    const res = child_process.execSync(cmd).toString().trim();
    return res;
  } catch (e) {
    // console.log(`#pre-commit: shell: (cmd: ${cmd}): ${e.message}`);
    return 'n/a';
  }
}


for (const branch of branches) {
  const path = `${__dirname}/src/x.version.${branch}.json`
  try {

    const commit = shell(`git rev-parse --short HEAD`);
    console.log({ commit });

    const template = mkTemplate();

    template.release.branch = branch;
    template.release.commit = commit;
    template.release.date = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(template, null, 2), 'utf8');
    console.log(`Success updated: ${path}`);
  } catch (e) {
    console.error(`Error reading file ${path}: ${e}`);
  }
}
