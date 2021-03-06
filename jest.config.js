module.exports = {
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js,.tsx,.jsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "^lodash-es$": "lodash"
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  setupFilesAfterEnv: [],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
};
