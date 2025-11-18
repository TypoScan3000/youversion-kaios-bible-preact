module.exports = {
  extends: ['@youversion/eslint-config-typescript/react'],
  settings: {
    // From Preact eslint config, so the React plugins work.
    react: {
      pragma: 'h',
      version: '16.0',
    },
  },
};
