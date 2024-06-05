import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, BottomNavigation, BottomNavigationTab, Input, Divider, Icon, Button } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';

export const HomeSeleccionProducFinal = () => {
  const [visible, setVisible] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para mantener el número de la página actual
  const [quantity, setQuantity] = useState(1); // Estado para mantener la cantidad seleccionada

  const useBottomNavigationState = (initialState = 0) => {
    const [selectedIndex, setSelectedIndex] = useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };
  

  const handleItemPress = (item: number) => {
    console.log(`Item ${item} pressed`);
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

  

  const handleAddToCart = () => {
    // Lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito');
  };
  
  const handlePageChange = (increment: number) => {
    setCurrentPage(prevPage => prevPage + increment);
  };

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

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



        <ScrollView>
  <Layout style={{ alignItems: 'center',  backgroundColor: "rgba(220, 251, 246, 0.30)" }}>
    <Layout style={styles.bigSquare}>
      <Text category='h4' style={{ textAlign: 'center', marginBottom: 8 }}>Imagen Producto</Text>
    </Layout>
    <Text category='h4' style={{ textAlign: 'center', marginBottom: 8 }}>Titulo Producto</Text>
    <Text category='s1' style={{ textAlign: 'center' }}>Precio: $5000</Text>
  </Layout>
  <Layout style={{height:400, backgroundColor: "rgba(220, 251, 246, 0.30)"}}>
  <Text category='h4' style={{ textAlign: "left", fontWeight: 'bold', marginTop: 15 }}>Descripción :</Text>
    <Text category='s1' style={{ textAlign: "center", marginTop: 8 ,color:"#767676"}}>Aenean commodo, nibh eget tempor imperdiet, urna quam malesuada justo, ac molestie diam urna vitae massa. Integer est leo, </Text>
    
    <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "rgba(220, 251, 246, 0.30)", alignItems: 'center', paddingHorizontal: 20, marginTop: 50 }}>
  <Text category='h4'>Cantidad:</Text>
  <Layout style={{ flexDirection: 'row', alignItems: 'center',  backgroundColor: "rgba(220, 251, 246, 0.30)" }}>
    <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
      <Text style={styles.quantityButtonText}>-</Text>
    </TouchableOpacity>
    <Text style={{ paddingHorizontal: 10 }}>{quantity}</Text>
    <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
      <Text style={styles.quantityButtonText}>+</Text>
    </TouchableOpacity>
  </Layout>
</Layout>

      {/* Botón de agregar al carrito */}
      <Button
        style={{ margin: 20 }}
        onPress={handleAddToCart}
        accessoryLeft={() => <MyIcon name="shopping-cart-outline" />}
      >
        Agregar al carrito
      </Button>
    </Layout>
</ScrollView>
        <Divider />

        <BottomNavigation style={{ marginVertical: 8 }} {...bottomState}>
          <BottomNavigationTab icon={() => <MyIcon name="home-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="question-mark-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="question-mark-outline" />} />
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
  bigSquare: {
    width: '60%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: 24,
  },
});


