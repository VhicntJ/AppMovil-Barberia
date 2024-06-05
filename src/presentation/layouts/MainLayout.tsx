import { useNavigation } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';


interface Props {
    title: string,
    subtitle?: string,

    rightAction?: () => void,
    rightActionIcon?: string,

    children: React.ReactNode;
}



export const MainLayout = ({
    title,
    subtitle,
    rightAction,
    rightActionIcon,
    children
}: Props) => {

    const {top} = useSafeAreaInsets();
    const {canGoBack,goBack} = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction 
        icon={<MyIcon name= "arrow-back-outline"/>} 
        onPress={goBack}
        />
    );


    const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
        const [selectedIndex, setSelectedIndex] = React.useState(initialState);
        return { selectedIndex, onSelect: setSelectedIndex };
      };
      
       
        const topState = useBottomNavigationState();
        const bottomState = useBottomNavigationState();

        return (
            <SafeAreaView style={{ flex: 1 }}>
              <Layout style={{ flex: 1 }}>
                <TopNavigation 
                  title="Bienvenido"
                  style={styles.title}
                  alignment="start"
                  accessoryLeft={canGoBack() ? renderBackAction : undefined}
                />
                <Divider />
                <Layout style={{ flex: 1 }}>
                  {/* Aquí puedes renderizar otros componentes o contenido */}
                </Layout>
                <Divider />
                <BottomNavigation
                  style={{marginVertical: 8}}
                  {...bottomState}
                >
                  <BottomNavigationTab icon={()=> <MyIcon name="home-outline"/>} />
                  <BottomNavigationTab icon={()=> <MyIcon name="question-mark-outline"/>} />
                  <BottomNavigationTab icon={()=> <MyIcon name="question-mark-outline"/>} />
                  <BottomNavigationTab icon={()=> <MyIcon name="shopping-cart-outline"/>} />
                  <BottomNavigationTab icon={()=> <MyIcon name="person-outline"/>} />
                </BottomNavigation> 
              </Layout>
            </SafeAreaView>
          );
        };
        
        
        
        const styles = StyleSheet.create({
            title: {
              fontSize: 24, // Cambia el tamaño del texto aquí
              fontWeight: 'bold',
            },
            });

