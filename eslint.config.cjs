// eslint.config.cjs
module.exports = [
  {
    files: ['*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'prettier/prettier': 'error',
      // '@angular-eslint/prefer-injectable-inject': 'error'
    },
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/template/prefer-built-in-control-flow': 'error',
    },
  },
];
