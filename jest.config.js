const ignores = [
  "/node_modules/",
  "/__fixtures__/",
  "/fixtures/",
  "/__tests__/helpers/",
  "/__tests__/utils/",
  "__mocks__",
];

module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  collectCoverageFrom: ["src/**/*.+(js|jsx|ts|tsx)"],
  testMatch: [
    "**/__tests__/**/*.+(js|jsx|ts|tsx)",
    "**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores, "src/(umd|cjs|esm)-entry.js$"],
};
