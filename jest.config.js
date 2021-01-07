module.exports = {
  reporters: ['default', 'jest-junit'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testRegex: '.*\\.(test|spec|unit|micro)\\.(ts|tsx)$',
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: ['text', 'lcov', 'json'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 40,
      lines: 70,
      statements: 70
    }
  }
};
