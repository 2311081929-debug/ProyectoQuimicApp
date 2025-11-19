import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PantallaBase from '../components/PantallaBase';

export default function Perfil({ navigation }) {
  const nombre = 'Ricardo';
  const correo = 'ricardo@quimicapp.com';

  return (
    <PantallaBase navigation={navigation}>
      <View style={styles.section}>
      <Image source={require('../Imagenes/Perfil.png')} style={styles.avatar} />
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.correo}>{correo}</Text>
        <Button title="Editar perfil" onPress={() => navigation.navigate('EditarPerfil')} />
      </View>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    alignItems: 'center',
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  correo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

});