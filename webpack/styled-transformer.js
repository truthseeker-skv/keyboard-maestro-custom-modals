const path = require('path');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  getDisplayName(filename, bindingName) {
    const parsed = path.parse(filename);
    let name = parsed.name;

    if (name === 'index') {
      [name] = parsed.dir.split(path.sep).slice(-1);
    }

    // starts with lower case or name of file same as a name of component
    if (/^[a-z]/.test(name) || name.toLowerCase() === bindingName?.toLowerCase()) {
      return bindingName;
    }

    return name + '_' + bindingName;
  }
});

exports.default = styledComponentsTransformer;
