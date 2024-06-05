import { Button, Input, Layout,Text } from "@ui-kitten/components"
import { Alert, ImageBackground, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { API_URL ,STAGE } from "@env";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}


export const LoginScreen = ({navigation}: Props) =>{

  const {login}= useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  console.log({apiUrl: API_URL, stage: STAGE});





  const {height,width} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if ( wasSuccessful )return;

    Alert.alert("Error", "Usuario o contraseña incorrectos");
    
  }

    return (
      // <ImageBackground
      //   source={require("../../layouts/img/estilista.png")}
      //   style={{flex:1}}
      //   resizeMode="cover"
      // >
      <Layout style={{flex:1}}>
        <ScrollView style={{marginHorizontal: 40}}>
        <Layout  style={{height: 100, backgroundColor:"rgba(245, 145, 143, 0.16)",borderRadius:100}} level="1"></Layout>

          <Layout style={{paddingTop: height * 0.19, alignItems:"center"}}>
            <Text category="h1">Iniciar Sesion</Text>
            <Text category="p2">Por favor, ingrese para continuar</Text>
          </Layout>

          <Layout style={{paddingTop: height * 0.050, alignItems: "center"}}>
            {/* <Text category="h5">Inicia con Google</Text> */}
          </Layout>


          <Layout>
            <Button style={{marginLeft: width * 0.10, marginRight: width * 0.10,backgroundColor: "#3F8FE4",borderColor: "#3F8FE4"}}
            accessoryLeft={<MyIcon name="google" white/>}
            
            size="small" 
              onPress={()=> {}}
              >
              Continua con Google
            </Button>
          </Layout>
          <Layout style={{paddingTop: 20, alignItems:"center"}}>
            
            <Text category="h6">O utiliza tu correo</Text>
          </Layout>

          <Layout style={{marginTop: 20}}>
            <Input
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={ form.email}
            onChangeText={(email) => setForm({...form, email})}
            accessoryLeft={()=> <MyIcon name="email-outline" />}
            style={{marginBottom: 10}} 
            />
            <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={ form.password}
            onChangeText={(password) => setForm({...form, password})}
            accessoryLeft={()=> <MyIcon name="lock-outline" />}
            secureTextEntry
            style={{marginBottom: 10}} 
            />

          </Layout>

          

          {/* Space */}
          <Layout style={{height: 20}} />

          {/* Button */}
          <Layout>
            <Button style={{backgroundColor: "#F5908F",borderColor: "#F5908F"}}
            disabled={isPosting}  
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
           
              onPress={onLogin}
              >
              Iniciar Sesion
            </Button>
          </Layout>
          <Text> {JSON.stringify(form,null,2)}</Text>

          {/* Informacion para crear cuenta */}
          <Layout style={{height:50 }} />
          <Layout style={{
            alignItems:"flex-end",
            flexDirection: "row", 
            justifyContent: "center"}}>
            <Text>¿Cliente nuevo?</Text>
            
            <Text 
            status="primary" 
            category="s1"
            onPress={()=> navigation.navigate('RegisterScreen')}
            >
              {" "}Registrate{" "}</Text>
          </Layout>

          <Layout  style={{height: 200, backgroundColor:"rgba(245, 145, 143, 0.16)",borderTopStartRadius:30,borderTopEndRadius:30,borderCurve:"continuous"}} level="1"></Layout>

        </ScrollView>

      </Layout>
      // </ImageBackground>
    )
}