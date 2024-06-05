import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home2Screen from '../screens/home/Home2Screen';
import { HomeSeleccion } from '../screens/product/HomeSeleccion';
import { HomeSeleccionProduc } from '../screens/product/HomeSeleccionProduc';
import { HomeCarrito } from '../screens/product/HomeCarrito';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator= () =>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home2Screen" component={Home2Screen} />
      <Tab.Screen name="HomeSeleccion" component={HomeSeleccion} />
      <Tab.Screen name="HomeSeleccionProduc" component={HomeSeleccionProduc} />
      <Tab.Screen name="HomeCarrito" component={HomeCarrito} />
    </Tab.Navigator>
  );
}