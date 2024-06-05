import { Button, Input, Layout,Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}


export const RegisterScreen = ({navigation}: Props) =>{
  const {height,width} = useWindowDimensions();
 
    return (
      <Layout style={{flex:1}}>
        <ScrollView style={{marginHorizontal: 40}}>

          <Layout style={{paddingTop: height * 0.15}}>
            <Text category="h1">Crear Cuenta</Text>
            <Text category="p2">Por favor, crea una cuenta para continuar</Text>
            
          </Layout>
          <Layout style={{paddingTop: height * 0.030, alignItems: "center"}}>
            <Text category="h5">Registro con Google</Text>
          </Layout>


          <Layout style={{paddingTop: height * 0.010,}}>
            <Button style={{marginLeft: width * 0.10, marginRight: width * 0.10,backgroundColor: "#3F8FE4",borderColor: "#3F8FE4"}}
            accessoryLeft={<MyIcon name="google" white/>}
            
            size="small" 
              onPress={()=> {}}
              >
              Continua con Google
            </Button>
          </Layout>

          <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={()=> <MyIcon name="email-outline" />}
            style={{marginBottom: 10}} 
            />
          <Input
            placeholder="Nombre"
            accessoryLeft={()=> <MyIcon name="person-outline" />}
            style={{marginBottom: 10}} 
            />
             <Input
            placeholder="Apellido"
            accessoryLeft={()=> <MyIcon name="person-outline" />}
            style={{marginBottom: 10}} 
            />
            <Input
            placeholder="Telefono"
            accessoryLeft={()=> <MyIcon name="phone-outline" />}
            style={{marginBottom: 10}} 
            />
            
            <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            accessoryLeft={()=> <MyIcon name="lock-outline" />}
            secureTextEntry
            style={{marginBottom: 10}} 
            />
            <Input
            placeholder="Verificar Contraseña"
            autoCapitalize="none"
            accessoryLeft={()=> <MyIcon name="lock-outline" />}
            secureTextEntry
            style={{marginBottom: 10}} 
            />

          </Layout>

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Button */}
          <Layout>
            <Button style={{backgroundColor: "#F5908F",borderColor: "#F5908F",}}
            accessoryRight={<MyIcon name="arrow-forward-outline" white/>} 
              onPress={()=> {}}
              >
              Registrarse
            </Button>
          </Layout>

          {/* Informacion para crear cuenta */}
          <Layout style={{height:50 }} />
          <Layout style={{
            alignItems:"flex-end",
            flexDirection: "row", 
            justifyContent: "center"}}>
            <Text>¿Ya tienes cuenta?</Text>
            <Text 
            status="primary" 
            category="s1"
            onPress={()=> navigation.goBack()}
            >
              {" "}Ingresar{" "}</Text>
          </Layout>


        </ScrollView>

      </Layout>
    )
}