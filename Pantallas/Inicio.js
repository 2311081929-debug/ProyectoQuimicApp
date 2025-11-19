import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PantallaBase from '../components/PantallaBase';

export default function Inicio({ navigation }) {
  return (
    <PantallaBase navigation={navigation}>
      {/* Laboratorio */}
      <View style={styles.section}>
        <Image source={require('../Imagenes/Laboratorio.png')} style={styles.sectionImage} />
        <Button title="Laboratorio" onPress={() => navigation.navigate('Laboratorio')} />
      </View>
      {/* Cuestionario */}
      <View style={styles.section}>
        <Image source={require('../Imagenes/Cuestionario.png')} style={styles.sectionImage} />
        <Button title="Cuestionario" onPress={() => navigation.navigate('Cuestionario')} />
      </View>

    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});