// eslint-disable-next-line @typescript-eslint/no-var-requires
const cpp_addons = require('../build/Release/addon');

console.log(cpp_addons.toString());
cpp_addons.default();
