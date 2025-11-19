// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { iniciarSesion } from '../Services/AuthService';

export default function PantallaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const user = await iniciarSesion(email, password);
      setMensaje(`✅ Bienvenido ${user.email}`);
      navigation.navigate('Main');
    } catch (error) {
      setMensaje(`❌ Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.mensaje}>{mensaje}</Text>
      <Text
        style={styles.registroLink}
        onPress={() => navigation.navigate('Registro')}
      >
        ¿No tienes cuenta? Regístrate aquí
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  mensaje: { marginTop: 10, fontSize: 16 },
  registroLink: {
    marginTop: 15,
    color: '#6200EE',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});