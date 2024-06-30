import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { LoginScreen } from '../../src/presentation/screens/auth/LoginScreen'; // Ajusta la ruta según la ubicación real del archivo
import { useAuthStore } from '../../src/presentation/store/auth/useAuthStore'; // Ajusta la ruta según la ubicación real del archivo
import { RootStackParams } from 'src/presentation/navigation/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Mock del hook useAuthStore
jest.mock('@store/auth/useAuthStore', () => ({
  login: jest.fn(),
}));

// Mock del navegador
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('LoginScreen', () => {
  it('should not attempt login if email or password is empty', () => {
    const mockLogin = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ login: mockLogin });
    const navigation: StackNavigationProp<RootStackParams, 'LoginScreen'> = { navigate: jest.fn() } as unknown as StackNavigationProp<RootStackParams, 'LoginScreen'>; // Declare the 'navigation' variable with the correct type
    const route: RouteProp<RootStackParams, 'LoginScreen'> = { params: {} }; // Declare the 'route' variable with the correct type
    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={navigation} route={route} />);

    fireEvent.changeText(getByPlaceholderText('Correo Electronico'), '');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), '');
    fireEvent.press(getByText('Iniciar Sesion'));

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should attempt login with valid email and password', async () => {
    const mockLogin = jest.fn().mockResolvedValue(true);
    useAuthStore.mockReturnValue({ login: mockLogin });
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Correo Electronico'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password');
    fireEvent.press(getByText('Iniciar Sesion'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
    });
  });

  it('should show error alert on failed login', async () => {
    const mockLogin = jest.fn().mockResolvedValue(false);
    useAuthStore.mockReturnValue({ login: mockLogin });
    jest.spyOn(Alert, 'alert');
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Correo Electronico'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password');
    fireEvent.press(getByText('Iniciar Sesion'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Usuario o contraseña incorrectos");
    });
  });
});

describe('LoginScreen - Input Fields', () => {
  it('should update email state on change', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Correo Electronico');

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('should update password state on change', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(passwordInput, 'password');
    expect(passwordInput.props.value).toBe('password');
  });
});

describe('LoginScreen - Buttons', () => {
  it('should disable login button while posting', async () => {
    const mockLogin = jest.fn().mockResolvedValue(false);
    useAuthStore.mockReturnValue({ login: mockLogin });
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Iniciar Sesion'));

    await waitFor(() => {
      expect(getByText('Iniciar Sesion').props.disabled).toBe(true);
    });
  });
});
