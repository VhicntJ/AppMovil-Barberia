import React from 'react'
import { Text, View } from 'react-native'
import { MainLayout } from '../../layouts/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from 'src/presentation/navigation/StackNavigator'
import { getProductById } from '../auth/products/get-product-by-id'


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}


export const ProductScreen = ({route}:Props) => {
  const {productId} = route.params;

  //useQuery
  const {data:product} = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    
  })	
  //useMutation



  if (!product){
    return (<MainLayout title="Cargando..."/>)  
  }

  return (
    <MainLayout
    title={product.title}
    subtitle={`Precio: ${product.price}`}
    >

 
    <Text>ProductScreen</Text>
    </MainLayout>
  )
}
