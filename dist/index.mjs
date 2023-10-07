function defaultExport(msg) {
  console.log(`${msg} from default export`);
}

const namedExport1 = 'named export 1';
const namedExport2 = 'named export 2';

export { defaultExport as default, namedExport1, namedExport2 };
