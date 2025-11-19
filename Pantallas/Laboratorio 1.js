import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PantallaBase from '../components/PantallaBase';

export default function Laboratorio({ navigation }) {
  return (
    <PantallaBase navigation={navigation}>
      <View style={styles.section}>
        <Text>Contenido del laboratorio </Text>
      </View>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    alignItems: 'center',
  },
});