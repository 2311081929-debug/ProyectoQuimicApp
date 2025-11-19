        import React from 'react';
import { ScrollView, StyleSheet, View, Text, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Encabezado from '../components/Encabezado';

export default function PantallaBase({ navigation, children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Encabezado navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 QUIMICAPP. Todos los derechos reservados.</Text>
          <View style={styles.socialRow}>
            <Ionicons
              name="logo-facebook"
              size={24}
              color="#ffffff"
              style={styles.icon}
              onPress={() => Linking.openURL('https://www.facebook.com/quimicapp')}
            />
            <Ionicons
              name="logo-instagram"
              size={24}
              color="#ffffff"
              style={styles.icon}
              onPress={() => Linking.openURL('https://www.instagram.com/quimicapp')}
            />
            <Ionicons
              name="logo-twitter"
              size={24}
              color="#ffffff"
              style={styles.icon}
              onPress={() => Linking.openURL('https://www.twitter.com/quimicapp')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#03BB85',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  footer: {
    marginTop: 60,
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
});