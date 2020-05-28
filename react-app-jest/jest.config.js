module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest",
    "\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};
