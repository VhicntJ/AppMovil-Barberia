import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PropsWithChildren, useEffect } from 'react';
import { RootStackParams } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { checkStatus, status, user } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        if (user?.roles.includes('admin')) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ProfileScreen' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home2Screen' }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    }
  }, [status, user]);

  return <>{children}</>;
};
