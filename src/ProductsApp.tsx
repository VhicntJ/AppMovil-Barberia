import 'react-native-gesture-handler';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native'
import { Text, View, useColorScheme } from 'react-native'
import { StackNavigator } from './presentation/navigation/StackNavigator';
import Toast from 'react-native-toast-message'; // Importa la librería de Toast
import 'react-native-gesture-handler';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()


export const ProductsApp = () => {
  
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = (colorScheme === 'dark')
  ? theme['color-basic-800']
  : theme['color-basic-100'];


  return (

    <QueryClientProvider client={queryClient}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
    {...eva} theme={theme}>
    <NavigationContainer theme ={{
      dark: colorScheme === 'dark',
      colors: {
        primary: theme['color-primary-500'],
        background: backgroundColor,
        card: theme['color-basic-100'],
        text: theme['text-basic-color'],
        border: theme['color-basic-800'],
        notification: theme['color-primary-500'],
      },
    
    }}>
      <AuthProvider>
    <StackNavigator/>
    </AuthProvider> 
    </NavigationContainer>
    
    </ApplicationProvider>
    </QueryClientProvider>
  )
}
