// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  const mock = jest.requireActual('react-native-gesture-handler');
  return mock;
});