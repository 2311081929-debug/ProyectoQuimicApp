import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Inicio from './Pantallas/Inicio';
import Laboratorio from './Pantallas/Laboratorio';
import Cuestionario from './Pantallas/Cuestionario';
import ReporteFallas from './Pantallas/ReportesFallas';
import PantallaPerfil from './Pantallas/PantallaPerfil';
import Logros from './Pantallas/Logros';
import PantallaLogin from './Pantallas/PantallaLogin';
import PantallaRegistro from './Pantallas/PantallaRegistro';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: 'blue' },
        headerTintColor: 'white',
        drawerActiveTintColor: '#6200EE',
        drawerLabelStyle: { fontSize: 17 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={Inicio}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Laboratorio"
        component={Laboratorio}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flask-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cuestionario"
        component={Cuestionario}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PantallaPerfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logros"
        component={Logros}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reporte de errores de la app"
        component={ReporteFallas}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={PantallaLogin} />
        <Stack.Screen name="Registro" component={PantallaRegistro} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}