module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/utils/**/*.js',
    'src/views/HistoryView.jsx',
    'src/views/LoginView.jsx',
    'src/views/TransferView.jsx',
    'src/components/bank/MovementList.jsx',
    'src/components/bank/TransferForm.jsx',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/testing/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/testing/**/*.test.{js,jsx}'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
}
