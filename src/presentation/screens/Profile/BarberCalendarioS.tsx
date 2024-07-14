import React from 'react';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Input,Icon, Layout, Modal, Text,Button } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView, View, Image, TouchableOpacity,  } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { IonIcon } from '../../components/ui/IonIcon';


export const BarberCalendarioS = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');

  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

  const handleShapePress = (shapeName: string) => {
    console.log(`Shape ${shapeName} presionado`);
    setSelectedItem(shapeName);
    setVisible(true);
  };

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  const navigation = useNavigation();

  const {logout} = useAuthStore();


  const closeModal = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF9F6" }}>
      <Button onPress={logout}>Cerrar sesión</Button>
      <Layout style={{ flex: 1, backgroundColor: "#FFF9F6", margin: 20 }}>
        <Text style={{ fontSize: 25, color: "#421B36", backgroundColor: "#FFF9F6", fontWeight: "bold", textAlign: "center" }}>Mi Agenda</Text>
        <Layout style={{ width: "auto", height: 10, backgroundColor: "rgba(139, 200, 185, 0.34)", borderRadius: 100 }} />    
            
            <View style={styles.rectangleContainer}>
                <Layout style={styles.rectangle}>
                  <View style={styles.innerContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.title2Text}>Selecciona un bloque para mas informacion</Text>
                    </View>
                  </View>
                </Layout>
                <View style={styles.largeSquare}>
              <Text style={styles.largeSquareText}>Seleccionar hora (Calendario)</Text>
            </View>
             
            </View>
          
          <Layout>
            
  <Layout style={[styles.rectangle2, { backgroundColor: '#8BC8B9' }]}>
  <View style={styles.productInfoContainer}>
    <IonIcon name="warning-outline" size={40} />
    <Text style={styles.title3Text}>Recuerda que puedes volver a habilitar o bloquear un bloque de tu horario segun tu preferencia</Text>
  </View>

  </Layout>

</Layout>
          </Layout>
          <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onBackdropPress={closeModal}>
            <Layout style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Horario : 13:00 - Miercoles</Text>
              <Text style={styles.modalText}>Cliente: Pedro Martinez</Text>
              <Text style={styles.modalText}>Servicio: Corte de Pelo</Text>
              <View style={styles.modalButtons}>
                <Button style={styles.greenButton}>Estoy a la hora</Button>
                <Button style={styles.redButton}>
                  Atrasar 15 minutos
                </Button>
              </View>
            </Layout>
          </Modal>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 9,
  },
  shape: {
    width: 100,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10, // Añadido margen vertical
    marginBottom: 40, // Añadido margen inferior
  },



  //DESDE ACA COMIENZA LO DEL CARRITO----------------------------------------------------------------------------------------------------------------
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
    height: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rectangle: {
    height: 50,
    backgroundColor: 'rgba(60, 170, 152, 0.2)', // Color con opacidad
    justifyContent: 'center',
    
    alignItems: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
    
    
  },
  rectangle2: {
    height: 100,
    backgroundColor: 'rgba(220, 251, 246, 0.50)', // Color con opacidad
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
    backgroundColor: 'rgba(245, 144, 143, 0.49)',
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
  title2Text: {
    fontSize: 17,
    color: '#000000',
    fontWeight: "700",
    marginLeft:15,
  },
  title3Text: {
    fontSize: 15,
    color: '#000000',
    fontWeight: "700",
    marginLeft:10,
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
  modalContainer: {
    backgroundColor: '#F5908F',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  modalImage: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Color con opacidad
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  greenButton: {
    backgroundColor: '#8BC8B9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    marginLeft: 10,
    color: '#ffffff',
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
});

export default styles;
