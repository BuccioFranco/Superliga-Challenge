module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: 'tsconfig.json',  
    }],
  },
};
