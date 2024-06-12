import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, BottomNavigation, BottomNavigationTab, Input, Divider, Icon, BottomNavigationProps } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { IonIcon } from '../../components/ui/IonIcon';

export const HomeSeleccionProduc = () => {
  const [visible, setVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para mantener el número de la página actual
  
  const [selectedIndex, setSelectedIndex] = useState(1); // Estado local para el índice seleccionado
  const navigation = useNavigation();

  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

  const handleItemPress = (item: number) => {
    console.log(`Item ${item} pressed`);
    navigation.navigate('HomeSeleccionProducFinal' as never);
    // Aquí puedes agregar la lógica para manejar el evento de clic en el ítem
  };
  const handleShapePress = (shapeName: string) => {
    // Aquí puedes realizar las acciones que desees según el nombre del shape presionado
    console.log(`Shape ${shapeName} presionado`);
    // Por ejemplo, podrías cambiar el estado, navegar a otra pantalla, etc.
  };

  const handleHeartPress = (item: number) => {
    setLikedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handlePageChange = (increment: number) => {
    setCurrentPage(prevPage => prevPage + increment);
  };

  const topState = useBottomNavigationState();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F6' }}>
      <Layout style={{ flex: 1, backgroundColor: '#FFF9F6', margin: 20 }}>
        <Text style={{ fontSize: 45, color: '#421B36', fontWeight: 'bold' }}>Bienvenido,</Text>
        <Text style={{ fontSize: 30, color: '#421B36', fontWeight: 'bold' }}>Elige tu producto</Text>
        <Text style={{ fontSize: 15, color: '#767676' }}>Buscador de productos</Text>
        

        <Layout style={{ backgroundColor: '#FFF9F6' }}>
          <Input
            style={{ margin: 30 }}
            accessoryLeft={<MyIcon name="search-outline" />}
            placeholder="Busca por nombre o categoría"
            inlineImageLeft="search-outline"
          />
        </Layout>
        <Layout >
            <Text style={{fontSize: 30,color:"#421B36",backgroundColor:"#FFF9F6",fontWeight:"bold"}}>Productos para</Text>
        </Layout>
        
        

        <Layout style={{ flex: 1, backgroundColor: '#FFF9F6' }}>
        <ScrollView horizontal={true} style={{ paddingHorizontal: 10 }}>
  <TouchableOpacity onPress={() => handleShapePress("Cabello")} style={[styles.shape, { backgroundColor: "#8BC8B9" }]}>
    <Text style={styles.text}>Cabello</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleShapePress("Barba")} style={[styles.shape, { backgroundColor: "#F5908F" }]}>
    <Text style={styles.text}>Barba</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleShapePress("Bigote")} style={[styles.shape, { backgroundColor: "#FBCE85" }]}>
    <Text style={styles.text}>Bigote</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleShapePress("Accesorios")} style={[styles.shape, { backgroundColor: "#8BC8B9" }]}>
    <Text style={styles.text}>Accesorios</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleShapePress("Ejemplo 5")} style={[styles.shape, { backgroundColor: "#F5908F" }]}>
    <Text style={styles.text}>Ejemplo 5</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleShapePress("Ejemplo 6")} style={[styles.shape, { backgroundColor: "#FBCE85" }]}>
    <Text style={styles.text}>Ejemplo 6</Text>
  </TouchableOpacity>
</ScrollView>


        <Layout style={{ alignItems: 'center' }}>
  <Layout style={{ width: 440, height: 30, backgroundColor: '#8BC8B9', justifyContent: 'center' }}>
    <Text style={{ fontWeight: "bold", textAlign: "center", color: "white",fontSize:20 }}>Cabello</Text>
  </Layout>
</Layout>


        {/* Agregar el nuevo contenido aquí */}
     

        <ScrollView>
          <Layout style={stylesgrid.container}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
              <TouchableOpacity key={item} style={stylesgrid.itemContainer} onPress={() => handleItemPress(item)}>
                <Layout style={stylesgrid.item}>
                  <Text category='h5'>Imagen Producto {item}</Text>
                </Layout>
                <Layout style={stylesgrid.bottomRow}>
                  <Text style={stylesgrid.itemText}>Producto</Text>
                  <Text style={stylesgrid.itemText2}>Valor: $5000</Text>
                </Layout>
              </TouchableOpacity>
            ))}
          </Layout>
        </ScrollView>
        <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
  <TouchableOpacity onPress={() => handlePageChange(-1)}>
    <Icon name='arrow-ios-back-outline' style={{ width: 32, height: 32 }} />
  </TouchableOpacity>
  <Text>Pagina 1</Text>
  <TouchableOpacity onPress={() => handlePageChange(1)}>
    <Icon name='arrow-ios-forward-outline' style={{ width: 32, height: 32 }} />
  </TouchableOpacity>
</Layout>

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



const stylesgrid = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    
    backgroundColor: 'rgba(139, 200, 185, 0.34)',
  },
  itemContainer: {
    width: '48%',
    marginVertical: 4,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    height: 185,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5908F',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomRow: {
    flexDirection: 'column', // Cambiado a columna
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    borderTopWidth: 2, // Agregado borde superior
    borderTopColor: '#FFF9F6', // Color del borde superior
    borderRadius: 10,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  itemText2: {
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row"
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
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 9,
  },
});


