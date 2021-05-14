module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: ['plugin:@typecript-eslint/recommended', 'prettier/@typerscript-eslint', 'plugin:prettier/recommended'],
  rules: {
    '@typecript-eslint/no-inferrable-types': 'on',
  },
}
