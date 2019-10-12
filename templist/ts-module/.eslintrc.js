module.exports = {
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "modules": true
      }
    },
    'env': {
      'browser': true,
      'commonjs': true,
      'node': true,
    },
    'extends': [
      'eslint:recommended',
      'plugin:prettier/recommended',
    ],
    'rules': {
      'no-undef': 'off',
      "@typescript-eslint/no-unused-vars": "warn",
      'prettier/prettier': 'error',
    },
    'plugins': ['@typescript-eslint', 'prettier'],
    'settings': {
      'import/resolver': {
        'node': {
          'extensions': ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  }
  