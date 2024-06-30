module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['../barberApp/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@ui-kitten)',
  ],
  testEnvironment: 'node', // Cambiar a 'node' si no se necesita un entorno de navegador completo
};
