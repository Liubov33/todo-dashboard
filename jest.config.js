/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
};
