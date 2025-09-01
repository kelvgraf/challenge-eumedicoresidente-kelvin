// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // raiz do projeto Next.js
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass|less|gif|ttf|eot|svg|png)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
};

export default createJestConfig(customJestConfig);
