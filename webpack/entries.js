const fs = require('fs');
const path = require('path');

const { entriesRootDir } = require('../paths').default;

const getEntries = () => {
  try {
    const names = fs.readdirSync(entriesRootDir);

    return names
      .filter((name) => fs.statSync(path.resolve(entriesRootDir, name)).isDirectory())
      .reduce((acc, dir) => {
        acc[dir] = path.resolve(entriesRootDir, dir, 'index.tsx');
        return acc;
      }, {});
  } catch (err) {
    console.error('Failed to get webpack entries!', err);
  }
};

exports.default = getEntries();
