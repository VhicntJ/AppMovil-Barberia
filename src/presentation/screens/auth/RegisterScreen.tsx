import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useWindowDimensions, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height, width } = useWindowDimensions();
  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const onRegister = async () => {
    if (form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await register(form.email, form.password, form.fullName);
    setIsPosting(false);
    if (wasSuccessful) {
      Alert.alert("Éxito", "Usuario registrado con éxito");
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert("Error", "No se pudo registrar el usuario");
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.15 }}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>
        <Layout style={{ paddingTop: height * 0.030, alignItems: "center" }}>
          <Text category="h5">Registro con Google</Text>
        </Layout>
        <Layout style={{ paddingTop: height * 0.010 }}>
          <Button
            style={{ marginLeft: width * 0.10, marginRight: width * 0.10, backgroundColor: "#3F8FE4", borderColor: "#3F8FE4" }}
            accessoryLeft={<MyIcon name="google" white />}
            size="small"
            onPress={() => {}}
          >
            Continua con Google
          </Button>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={() => <MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Nombre Completo"
            value={form.fullName}
            onChangeText={(fullName) => setForm({ ...form, fullName })}
            accessoryLeft={() => <MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={() => <MyIcon name="lock-outline" />}
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            style={{ backgroundColor: "#F5908F", borderColor: "#F5908F" }}
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onRegister}
          >
            Registrarse
          </Button>
        </Layout>

        {/* Informacion para crear cuenta */}
        <Layout style={{ height: 50 }} />
        <Layout style={{
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <Text>¿Ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}
          >
            {" "}Ingresar{" "}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
