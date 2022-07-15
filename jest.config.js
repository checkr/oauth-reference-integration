// eslint-disable-next-line import/no-anonymous-default-export
export default {
  transform: {},
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'client/', '__tests__/testSupport'],
  globalSetup: './__tests__/testSupport/setupTests.js',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'identity-obj-proxy',
  },
}
