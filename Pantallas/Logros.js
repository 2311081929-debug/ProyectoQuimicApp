import React from 'react';
import { View, Text, StyleSheet, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PantallaBase from '../components/PantallaBase';

const logros = [
  { id: '1', titulo: 'Primer experimento completado', desbloqueado: true },
  { id: '2', titulo: 'Memorama resuelto en menos de 1 minuto', desbloqueado: true },
  { id: '3', titulo: 'Cuestionario perfecto (10/10)', desbloqueado: false },
  { id: '4', titulo: 'Reporte de falla enviado', desbloqueado: false },
];

export default function Logros({ navigation }) {
  return (
    <PantallaBase navigation={navigation}>
      <View style={styles.section}>
        <Text style={styles.title}>Tus Logros</Text>
        <FlatList
          data={logros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.logro, !item.desbloqueado && styles.bloqueado]}>
              <Ionicons
                name={item.desbloqueado ? 'trophy' : 'lock-closed'}
                size={24}
                color={item.desbloqueado ? '#FFD700' : '#ccc'}
                style={styles.icon}
              />
              <Text style={styles.texto}>{item.titulo}</Text>
            </View>
          )}
        />
      </View>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  logro: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#e0f7e9',
    borderRadius: 8,
  },
  bloqueado: {
    backgroundColor: '#f0f0f0',
  },
  icon: {
    marginRight: 10,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
});