import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Input, Layout, Button, Text, Icon, Card, Modal } from '@ui-kitten/components';
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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({ 'Producto 1': 1, 'Producto 2': 1 });

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(3);

  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

  

  const navigateToScreen = (index: number) => {
    setSelectedIndex(index);
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

  const incrementQuantity = (product: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product]: prevQuantities[product] + 1,
    }));
  };

  const decrementQuantity = (product: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product]: prevQuantities[product] > 0 ? prevQuantities[product] - 1 : 0,
    }));
  };

  const removeProduct = (product: string) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[product];
      return newQuantities;
    });
  };

  // Precios específicos para servicios y productos
  const servicioPrecio = 12000; // Suma de los precios de los servicios
  const productosPrecio = Object.keys(quantities).reduce((total, product) => {
    // Precio de cada producto * cantidad
    const precioUnitario = 3000; // Precio unitario de cada producto
    return total + quantities[product] * precioUnitario;
  }, 0);

  const calculateTotal = () => {
    return servicioPrecio + productosPrecio;
  };

  const showSuccessMessage = () => {
    Toast.show({
      type: 'success',
      text1: 'Operación realizada con éxito',
      text2: '',
      visibilityTime: 5000,
      position: 'top',
      topOffset: 60,
      onPress: () => Toast.hide(),
      props: {
        icon: () => <MyIcon name="checkmark-circle-2-outline" />,
      },
    });
  };

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Corte de pelo - Del Corte', schedule: 'Agendar: JP     Mier. 14:00', price: 10000 },
    { id: 2, name: 'Perfilado de ceja', schedule: 'Agendar: JP     Mier. 14:00', price: 2000 },
  ]);

  const handleDeleteProduct = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };
  const handlePaymentOptionPress = () => {
    setModalVisible(false);
    showSuccessMessage();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F6' }}>
      <Layout style={{ flex: 1, backgroundColor: '#FFF9F6', margin: 20 }}>
        <View style={styles.headerContainer}>
          <Icon name="shopping-cart" fill="#421B36" style={styles.headerIcon} />
          <Text style={styles.headerText}>Carrito</Text>
        </View>

        <Layout style={{ flex: 1, backgroundColor: '#FFF9F6' }}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.moreInfoText}>Servicio</Text>

            {cartItems.map((item, index) => (
              <Layout style={styles.rectangle} key={index}>
                <View style={styles.innerContainer}>
                  <View style={styles.smallSquare} />
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.subtitleText}>{item.schedule}</Text>
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>Valor</Text>
                      <View style={styles.totalAmountContainer}>
                        <Text style={styles.totalAmount}>${item.price}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.trashIconContainer}
                    onPress={() => handleDeleteProduct(index)}
                  >
                    <Icon name="trash-2-outline" fill="#421B36" style={styles.trashIcon2} />
                  </TouchableOpacity>
                </View>
              </Layout>
            ))}
          </ScrollView>

          <ScrollView contentContainerStyle={[styles.scrollViewContent, { marginTop: 0 }]}>
            <Text style={styles.moreInfoText}>Productos</Text>

            {Object.keys(quantities).map((product) => (
              <View key={product} style={styles.rectangleContainer}>
                <Layout style={styles.rectangle}>
                  <View style={styles.innerContainer}>
                    <View style={styles.smallSquare} />
                    <View style={styles.textContainer}>
                      <Text style={styles.titleText}>{product}</Text>
                    </View>
                    <View style={styles.productInfoContainer}>
                      <TouchableOpacity
                        style={styles.changeQuantityButton}
                        onPress={() => decrementQuantity(product)}
                      >
                        <Text style={styles.changeQuantityText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.productQuantity}>{quantities[product]}</Text>
                      <TouchableOpacity
                        style={styles.changeQuantityButton}
                        onPress={() => incrementQuantity(product)}
                      >
                        <Text style={styles.changeQuantityText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.trashIconContainer}
                        onPress={() => removeProduct(product)}
                      >
                        <Icon name="trash-2-outline" fill="#421B36" style={styles.trashIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Layout>
              </View>
            ))}

            <View style={styles.rectangleContainer}>
              <Layout style={styles.rectangle}>
                <View style={styles.innerContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Pagar</Text>
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total</Text>
                    <View style={styles.totalAmountContainer}>
                      <Text style={styles.totalAmount}>${calculateTotal()}</Text>
                    </View>
                  </View>
                </View>
              </Layout>
              <Button style={styles.payButton} onPress={() => setModalVisible(true)}>
                Pagar
              </Button>
            </View>
          </ScrollView>

          <Divider />

          <BottomNavigation
            style={{ marginVertical: 8 }}
            selectedIndex={selectedIndex}
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

      <Modal visible={modalVisible} backdropStyle={styles.backdrop} onBackdropPress={() => setModalVisible(false)}>
        <Card disabled={true}>
          <Text style={styles.modalTitle}>Forma de Pago</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={styles.paymentOption} onPress={handlePaymentOptionPress}>
              <IonIcon name="card-outline" size={30} />
              <Text>Débito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={handlePaymentOptionPress}>
              <IonIcon name="cash-outline" size={30} />
              <Text>Efectivo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={handlePaymentOptionPress}>
              <IonIcon name="web" size={30} />
              <Text>WebPay</Text>
            </TouchableOpacity>
          </View>
          <Button style={styles.payButton} onPress={() => setModalVisible(false)}>
            Cerrar
          </Button>
        </Card>
      </Modal>

      <Toast />
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentOption: {
    alignItems: 'center',
    marginLeft: 30,
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
  trashIcon2: {
    width: 20,
    height: 20,
    marginBottom: 35,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 14,
    color: '#421B36',
    marginRight: 5,
    marginLeft: 250,
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


