// screens/RegistroScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registrarUsuario } from '../Services/AuthService';

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [hobby, setHobby] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleRegistro = async () => {
    try {
      await registrarUsuario(email, password, nombre, hobby);
      setMensaje('✅ Usuario registrado con éxito');
    } catch (error) {
      setMensaje(`❌ Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Hobby" value={hobby} onChangeText={setHobby} style={styles.input} />
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Registrarse" onPress={handleRegistro} />
      <Text style={styles.mensaje}>{mensaje}</Text>
      <Text
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        ¿Ya tienes cuenta? Inicia sesión aquí
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  mensaje: { marginTop: 10, fontSize: 16 },
  loginLink: {
    marginTop: 15,
    color: '#6200EE',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});