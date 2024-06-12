import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { Home2Screen } from '../screens/home/Home2Screen';
import { HomeSeleccion } from '../screens/product/HomeSeleccion';
import { HomeSeleccionFinal } from '../screens/product/HomeSeleccionFinal';
import { HomeSeleccionProduc } from '../screens/product/HomeSeleccionProduc';
import { HomeSeleccionProducFinal } from '../screens/product/HomeSeleccionProducFinal';
import { HomeCarrito } from '../screens/product/HomeCarrito';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';


export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen  : undefined;
    Home2Screen : undefined;
    ProductScreen: {id: string};
    HomeSeleccion: undefined;
    HomeSeleccionFinal: undefined;
    HomeSeleccionProduc: undefined;
    HomeSeleccionProducFinal: undefined;
    HomeCarrito: undefined;
    ProfileScreen: undefined;

}

const Stack = createStackNavigator<RootStackParams>();


const fadeAnimation: StackCardStyleInterpolator = ({ current }) => ({

    cardStyle: {
        opacity: current.progress,
    },
    });

export const  StackNavigator = ()=> {
  return (
    <Stack.Navigator 
    initialRouteName="LoadingScreen"
    screenOptions={{
        headerShown: false,
        cardStyleInterpolator: fadeAnimation,
    }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Home2Screen" component={Home2Screen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="HomeSeleccion" component={HomeSeleccion} />
      <Stack.Screen name="HomeSeleccionFinal" component={HomeSeleccionFinal} />
      <Stack.Screen name="HomeSeleccionProduc" component={HomeSeleccionProduc} />
      <Stack.Screen name="HomeSeleccionProducFinal" component={HomeSeleccionProducFinal} />
      <Stack.Screen name="HomeCarrito" component={HomeCarrito} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}