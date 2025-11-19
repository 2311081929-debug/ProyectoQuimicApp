import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Encabezado({ navigation }) {
  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={32}
        color="#ffffff"
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuIcon}
      />
      <Image source={require('../Imagenes/Logo.png')} style={styles.logoSmall} />
      <View style={styles.headerText}>
        <Text style={styles.appName}>QUIMICAPP</Text>
        <Text style={styles.slogan}>Explora, juega y aprende química</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    position: 'relative',
    top: 0,
    zIndex: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  logoSmall: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    flexDirection: 'column',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  slogan: {
    fontSize: 14,
    color: '#ffffff',
  },
})