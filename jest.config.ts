// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass|less|gif|ttf|eot|svg|png)$":
      "<rootDir>/__mocks__/fileMock.js",

    // mapeando o alias do tsconfig
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(customJestConfig);
