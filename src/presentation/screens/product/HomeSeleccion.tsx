
import { BottomNavigation,Modal, BottomNavigationProps, BottomNavigationTab, Button,Divider,Icon,Input,Layout, Text, TopNavigation } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { getProductsByPage } from '../auth/products/get-products-by-page';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { IonIcon } from '../../components/ui/IonIcon';



export const HomeSeleccion = () => {

  const [visible, setVisible] = React.useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(2); // Estado local para el índice seleccionado
  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

      const handleItemPress = (item: number) => {
        console.log(`Item ${item} pressed`);
        navigation.navigate('HomeSeleccionFinal' as never);
        // Aquí puedes agregar la lógica para manejar el evento de clic en el ítem
      };
      const handleHeartPress = (item: number) => {
        setLikedItems((prev) => {
          if (prev.includes(item)) {
            return prev.filter((i) => i !== item);
          } else {
            return [...prev, item];
          }
        });
      };
        

      const navigateToScreen = (index: number) => {
        setSelectedIndex(index); // Actualiza el estado del índice seleccionado al cambiar de pantalla
        switch (index) {
          case 0:
            navigation.navigate('Home2Screen' as never);
            break;
          case 1:
            navigation.navigate('HomeSeleccionProduc' as never);
            break;
          case 2:
            navigation.navigate('HomeSeleccion' as never);
            break;
          case 3:
            navigation.navigate('HomeCarrito' as never);
            break;
          default:
            break;
        }
      };
        return (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF9F6" }}>
            <Layout style={{ flex: 1, backgroundColor: "#FFF9F6", margin: 20 }}>
              <Text style={{ fontSize: 45, color: "#421B36", fontWeight: "bold" }}>Bienvenido,</Text>
              <Text style={{ fontSize: 30, color: "#421B36", fontWeight: "bold" }}>Elige tu corte</Text>
              <Text style={{ fontSize: 15, color: "#767676" }}>Busca un corte de pelo específico</Text>
      
              <Layout style={{ backgroundColor: "#FFF9F6" }}>
                <Input
                  style={{ margin: 30 }}
                  accessoryLeft={<MyIcon name="search-outline" />}
                  placeholder='Busca por nombre o categoría'
                  inlineImageLeft='search-outline'
                />
              </Layout>
      
              <Layout style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Text style={{ fontSize: 25, color: "#421B36", backgroundColor: "#FFF9F6", fontWeight: "bold", textAlign: "center" }}>Haz elegido Ovalado</Text>
                <Layout style={{ width: "auto", height: 10, backgroundColor: "rgba(139, 200, 185, 0.34)", borderRadius: 100 }} />
      
                <ScrollView>
                  <Layout style={stylesgrid.container}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
                      <Layout key={item} style={stylesgrid.itemContainer}>
                        <TouchableOpacity style={stylesgrid.item} onPress={() => handleItemPress(item)}>
                          <Text category='h5'>Imagen Corte de pelo {item}</Text>
                        </TouchableOpacity>
                        <Layout style={stylesgrid.bottomRow}>
                          <TouchableOpacity onPress={() => handleHeartPress(item)}>
                            <MyIcon name={likedItems.includes(item) ? "heart" : "heart-outline"} />
                          </TouchableOpacity>
                          <Text style={stylesgrid.itemText}>Corte de pelo</Text>
                        </Layout>
                      </Layout>
                    ))}
                  </Layout>
                </ScrollView>
      
                <Divider />
      
                <BottomNavigation
          style={{ marginVertical: 8 }}
          selectedIndex={selectedIndex} // Utiliza el estado local del índice seleccionado
          onSelect={index => navigateToScreen(index)}
        >
          <BottomNavigationTab icon={() => <MyIcon name="home-outline" />} />
          <BottomNavigationTab icon={() => <IonIcon name="cut-outline" />} />
          <BottomNavigationTab icon={() => <IonIcon name="happy-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="shopping-cart-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="person-outline" />} onPress={() => setVisible(true)} />
        </BottomNavigation>
              </Layout>
            </Layout>
          </SafeAreaView>
        );
      }
      
      const stylesgrid = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 4,
        },
        itemContainer: {
          width: '48%',
          marginVertical: 4,
          alignItems: 'center',
        },
        item: {
          width: '100%',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#F5908F",
        },
        bottomRow: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 10,
          marginTop: 10,
        },
        itemText: {
          flex: 1,
          textAlign: 'center',
        },
      });