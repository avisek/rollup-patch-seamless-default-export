module.exports = {
  input: './src/index.js',
  output: [
    {
      file: './dist/index.cjs',
      format: 'cjs',
      esModule: false,
    },
    {
      file: './dist/index.mjs',
      format: 'es',
    },
  ],
}
