import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/test/styleMock.ts",
  },

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },

  testMatch: [
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/src/**/*.test.tsx",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  clearMocks: true,
};

export default config;