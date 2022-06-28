export default {
  transform: {},
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'client/'],
  globalSetup: './setupTests.js',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'identity-obj-proxy',
  },
}
