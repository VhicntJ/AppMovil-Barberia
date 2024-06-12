import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Input, Layout, Button, Text } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { MyIcon } from '../../components/ui/MyIcon';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { IonIcon } from '../../components/ui/IonIcon';

export const HomeSeleccionFinal = () => {
  const [visible, setVisible] = React.useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  

  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
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

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Agregado al carrito con éxito',
      visibilityTime: 3000,
      position: 'top',
      topOffset: 50,
      props: {
        icon: () => <MyIcon name="checkmark-circle-2-outline" />,
      },
    });
  };

  const handleBarberPress = (barber: number) => {
    setSelectedBarber(barber);
  };
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(2); // Estado local para el índice seleccionado
  

  const bottomState = useBottomNavigationState();
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
          />
        </Layout>

        <Layout style={{ flex: 1, backgroundColor: "#FFF9F6" }}>
          <Text style={{ fontSize: 25, color: "#421B36", backgroundColor: "#FFF9F6", fontWeight: "bold", textAlign: "center" }}>Haz elegido : Corte Fino</Text>
          <Layout style={{ width: "auto", height: 10, backgroundColor: "rgba(139, 200, 185, 0.34)", borderRadius: 100 }} />

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Layout style={styles.square}>
              <Text style={styles.squareText}>Imagen corte</Text>
            </Layout>
            <Text style={styles.middleText}>Corte de pelo</Text>
            <Text style={styles.additionalText}>Corte para cabeza ovalada o en forma de corazon, . Las capas añaden suavidad a los rasgos faciales y pueden equilibrar las proporciones, creando una apariencia más armoniosa.</Text>
            <Text style={styles.moreInfoText}>Más Información</Text>
            
            <Layout style={styles.row}>
              <Layout style={styles.rectangle}>
                <Text style={styles.rectangleText}>Tips para este corte de pelo</Text>
              </Layout>
              <Layout style={styles.rectangle}>
                <Text style={styles.rectangleText}>Productos Beneficios</Text>
              </Layout>
            </Layout>

            <Text style={styles.selectBarberText}>Selecciona al barbero</Text>
            <ScrollView horizontal contentContainerStyle={styles.barberScrollView}>
              {[1, 2, 3, 4, 5, 6].map((barber) => (
                <View key={barber} style={styles.barberContainer}>
                  <TouchableOpacity
                    style={[
                      styles.barberSquare,
                      selectedBarber === barber && styles.selectedBarberSquare
                    ]}
                    onPress={() => handleBarberPress(barber)}
                  >
                    <Text style={styles.barberSquareText}>Barbero {barber}</Text>
                  </TouchableOpacity>
                  <Text style={styles.barberNameText}>Barbero {barber}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.largeSquare}>
              <Text style={styles.largeSquareText}>Seleccionar hora (Calendario)</Text>
            </View>
            <Button style={styles.button} onPress={showToast} accessoryLeft={<MyIcon name="calendar-outline" white />}>
              Tomar hora
          
            </Button>
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
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    padding: 20,
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  squareText: {
    color: 'white',
    fontWeight: 'bold',
  },
  middleText: {
    fontSize: 18,
    color: '#421B36',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 16,
    color: '#767676',
    marginBottom: 20,
  },
  moreInfoText: {
    fontSize: 25,
    color: "#421B36",
    backgroundColor: "#FFF9F6",
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rectangle: {
    flex: 1,
    height: 100,
    backgroundColor: 'rgba(251, 206, 133, 0.38)', // Color con opacidad
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,

  },
  rectangleText: {
    fontSize: 16,
    color: '#421B36',
    textAlign: 'center',
  },
  selectBarberText: {
    fontSize: 25,
    color: "#421B36",
    backgroundColor: "#FFF9F6",
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  barberScrollView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  barberContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  barberSquare: {
    width: 100,
    height: 100,
    backgroundColor: '#FBCE85',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedBarberSquare: {
    backgroundColor: '#F6A623',
  },
  barberSquareText: {
    fontSize: 16,
    color: '#421B36',
    textAlign: 'center',
  },
  barberNameText: {
    fontSize: 14,
    color: '#421B36',
    marginTop: 5,
    textAlign: 'center',
  },
  largeSquare: {
    width: '100%',
    height: 300,
    backgroundColor: '#FBCE85',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  largeSquareText: {
    fontSize: 20,
    color: '#421B36',
    textAlign: 'center',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
