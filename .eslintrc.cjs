module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
