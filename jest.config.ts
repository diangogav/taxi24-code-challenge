/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  preset: "ts-jest",
  roots: [
    "<rootDir>/tests",
  ],
  testEnvironment: "node",
  verbose: true,
  globalSetup: "./tests/globalSetup.ts",
  globalTeardown: "./tests/globalTeardown.ts"
};
