'use strict';

function defaultExport(msg) {
  console.log(`${msg} from default export`);
}

const namedExport1 = 'named export 1';
const namedExport2 = 'named export 2';

exports = module.exports = defaultExport;
exports.default = defaultExport;
exports.namedExport1 = namedExport1;
exports.namedExport2 = namedExport2;
