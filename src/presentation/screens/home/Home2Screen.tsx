import React from 'react';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Input,Icon, Layout, Modal, Text, Button } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth/useAuthStore';


import { IonIcon } from '../../components/ui/IonIcon';
import { getProductsByPage } from '../auth/products/get-products-by-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';

export const Home2Screen = () => {
  const [visible, setVisible] = React.useState(false);

  const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

  const handleShapePress = (shapeName: string) => {
    console.log(`Shape ${shapeName} presionado`);
    navigation.navigate('HomeSeleccion' as never );
  };

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  const navigation = useNavigation();

  const {logout} = useAuthStore();

  const {isLoading , data ,fetchNextPage} = useInfiniteQuery({
    queryKey : ['products', "infinite"],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,


    queryFn: async (params) =>{
      console.log({params});
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });


  const navigateToScreen = (index: number) => {
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
      <Button
        style={styles.payButton}
        onPress={logout} >Cerrar sesión</Button>
      
      <Layout style={{ flex: 1, backgroundColor: "#FFF9F6", margin: 20 }}>
        <Text style={{ fontSize: 45, color: "#421B36", fontWeight: "bold" }}>Bienvenido,</Text>
        <Text style={{ fontSize: 30, color: "#421B36", fontWeight: "bold" }}>Elige tu corte</Text>
        <Text style={{ fontSize: 15, color: "#767676" }}>Busca un corte de pelo especifico</Text>

        <Layout style={{ backgroundColor: "#FFF9F6" }}>
          <Input
            style={{ margin: 30 }}
            accessoryLeft={<MyIcon name="search-outline" />}
            placeholder='Busca por nombre o categoria'
          />
        </Layout>

        <Layout>
          <Text style={{ fontSize: 30, color: "#421B36", backgroundColor: "#FFF9F6", fontWeight: "bold" }}>Estilos de corte</Text>
        </Layout>

        <ScrollView horizontal={true} style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={() => handleShapePress("Cabello")} style={[styles.shape, { backgroundColor: "#8BC8B9" }]}>
            <Text style={styles.text}>Ovalado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress("Barba")} style={[styles.shape, { backgroundColor: "#F5908F" }]}>
            <Text style={styles.text}>Redondo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress("Bigote")} style={[styles.shape, { backgroundColor: "#FBCE85" }]}>
            <Text style={styles.text}>Diamante</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress("Accesorios")} style={[styles.shape, { backgroundColor: "#8BC8B9" }]}>
            <Text style={styles.text}>Huevo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress("Ejemplo 5")} style={[styles.shape, { backgroundColor: "#F5908F" }]}>
            <Text style={styles.text}>Ejemplo 5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShapePress("Ejemplo 6")} style={[styles.shape, { backgroundColor: "#FBCE85" }]}>
            <Text style={styles.text}>Ejemplo 6</Text>
          </TouchableOpacity>
        </ScrollView>

        <Layout>
          <Text style={{ fontSize: 30, color: "#421B36", backgroundColor: "#FFF9F6", fontWeight: "bold" }}>Cortes Tendencia 🔥</Text>
        </Layout>

        <Layout style={{ flex: 1 }}>
        </Layout>
        {/* {
        isLoading
        ? (<FullScreenLoader/>)
        : <ProductList
         products={data?.pages.flat() ??[]}
         fetchNextPage={fetchNextPage}
         />
      } */}
        <ScrollView contentContainerStyle={styles.listContainer}>
        
          
          {Array.from({ length: 10 }).map((_, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeSeleccionFinal' as never)} style={styles.card}>
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text category='s1' style={styles.cardTitle}>Corte de pelo {index + 1}</Text>
                  <Icon name='heart-outline' style={styles.cardIcon} />
                </View>
                <Text category='c1' appearance='hint'>Subtitulo {index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        ></Modal>

        <Divider />
        <BottomNavigation
          style={{ marginVertical: 8 }}
          selectedIndex={topState.selectedIndex}
          onSelect={index => navigateToScreen(index)}
        >
          <BottomNavigationTab icon={() => <MyIcon name="home-outline" />} />
          <BottomNavigationTab icon={() => <IonIcon name="cut-outline" />} />
          <BottomNavigationTab icon={() => <IonIcon name="happy-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="shopping-cart-outline" />} />
          <BottomNavigationTab icon={() => <MyIcon name="person-outline" />} onPress={() => setVisible(true)} />
        </BottomNavigation>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  shapeButton: {
    width: 100,
    height: 40,
    backgroundColor: "#8BC8B9",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  shapeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  },
  listContainer: {
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  cardContent: {
    padding: 8
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardIcon: {
    width: 20,
    height: 20
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
    marginBottom: 70, // Añadido margen inferior
  },
  payButton: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#421B36',
    borderColor: '#421B36',
    width: 100,
    alignSelf: 'flex-end',
  },
});

export default Home2Screen;
function setSelectedIndex(index: number) {
  throw new Error('Function not implemented.');
}

