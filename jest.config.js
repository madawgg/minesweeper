/** @type {import('jest').Config} */


module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+.[t|j]sx?$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/mocks/fileMock.js',
    '.(mp3|mp4|wav|ogg)$': '<rootDir>/mocks/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

