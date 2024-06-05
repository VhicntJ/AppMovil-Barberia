
import { Button,Icon,Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { getProductsByPage } from '../auth/products/get-products-by-page';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';


export const HomeScreen = () => {

  // const {isLoading, data: products} = useQuery({
  //   queryKey: ["products", "infinite"],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // })
  
  // const {logout} = useAuthStore();


  return (
    <MainLayout
    title="Barber Shop - productos"
    subtitle='Aplicacion administrativa'
    >
    
      <FullScreenLoader/>


      </MainLayout>
  )
}
