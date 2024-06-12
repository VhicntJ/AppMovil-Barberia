import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Input, Layout, Button, Text, Icon } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { MyIcon } from '../../components/ui/MyIcon';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { IonIcon } from '../../components/ui/IonIcon';

export const HomeCarrito = () => {
  const [visible, setVisible] = React.useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const navigation = useNavigation();
  
  const [selectedIndex, setSelectedIndex] = useState(3);
  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };


  const handleBarberPress = (barber: number) => {
    setSelectedBarber(barber);
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
      <View style={styles.headerContainer}>
        <Icon name="shopping-cart" fill="#421B36" style={styles.headerIcon} />
        <Text style={styles.headerText}>Carrito</Text>
      </View>
  
        <Layout style={{ flex: 1, backgroundColor: "#FFF9F6" }}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.moreInfoText}>Servicio</Text>
            
            <View style={styles.rectangleContainer}>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.smallSquare} />
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Corte de pelo - Del Corte</Text>
                    <Text style={styles.subtitleText}>Agendar: JP     Mier. 14:00</Text>
                  </View>
                </View>
              </Layout>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.smallSquare} />
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Perfilado de ceja</Text>
                    <Text style={styles.subtitleText}>Agendar: JP     Mier. 14:00</Text>
                  </View>
                </View>
              </Layout>
            </View>
          </ScrollView>
  
          <ScrollView contentContainerStyle={[styles.scrollViewContent, { marginTop: 0 }]}>
            <Text style={styles.moreInfoText}>Productos</Text>
            
            <View style={styles.rectangleContainer}>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.smallSquare} />
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Producto 1</Text>
                  </View>
                  <View style={styles.productInfoContainer}>
                    <TouchableOpacity style={styles.changeQuantityButton}>
                      <Text style={styles.changeQuantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.productQuantity}>1</Text>
                    <TouchableOpacity style={styles.changeQuantityButton}>
                      <Text style={styles.changeQuantityText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trashIconContainer}>
                      <Icon name='trash-2-outline' fill='#421B36' style={styles.trashIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Layout>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.smallSquare} />
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Producto 2</Text>
                  </View>
                  <View style={styles.productInfoContainer}>
                    <TouchableOpacity style={styles.changeQuantityButton}>
                      <Text style={styles.changeQuantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.productQuantity}>1</Text>
                    <TouchableOpacity style={styles.changeQuantityButton}>
                      <Text style={styles.changeQuantityText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trashIconContainer}>
                      <Icon name='trash-2-outline' fill='#421B36' style={styles.trashIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Layout>
            </View>
  
            <View style={styles.rectangleContainer}>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Pagar</Text>
                    
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total</Text>
                    <View style={styles.totalAmountContainer}>
                      <Text style={styles.totalAmount}>$12990</Text>
                    </View>
                  </View>
                </View>
              </Layout>
              <Button style={styles.payButton}>Pagar</Button>
            </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  headerText: {
    fontSize: 45,
    color: "#421B36",
    fontWeight: "bold",
  },
  scrollViewContent: {
    alignItems: 'center',
    padding: 10,
  },
  moreInfoText: {
    fontSize: 25,
    color: "#421B36",
    backgroundColor: "#FFF9F6",
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  rectangleContainer: {
    marginTop: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rectangle: {
    height: 100,
    backgroundColor: 'rgba(251, 206, 133, 0.38)', // Color con opacidad
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  smallSquare: {
    width: 50,
    height: 50,
    backgroundColor: '#FBCE85',
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#421B36',
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 14,
    color: '#421B36',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productText: {
    fontSize: 14,
    color: '#421B36',
  },
  productQuantity: {
    fontSize: 14,
    color: '#421B36',
    marginHorizontal: 5,
  },
  changeQuantityButton: {
    padding: 5,
    backgroundColor: '#FBCE85',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  changeQuantityText: {
    fontSize: 16,
    color: '#421B36',
    fontWeight: 'bold',
  },
  trashIconContainer: {
    padding: 5,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 14,
    color: '#421B36',
    marginRight: 5,
  },
  totalAmountContainer: {
    backgroundColor: '#FBCE85',
    borderRadius: 5,
    padding: 5,
  },
  totalAmount: {
    fontSize: 14,
    color: '#421B36',
  },
  payButton: {
    marginTop: 10,
    backgroundColor: '#421B36',
    borderColor: '#421B36',
  },
  barberSquare: {
    height: 100,
    marginVertical: 10,
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
});


