import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PantallaBase from '../components/PantallaBase';

export default function ReporteFallas({ navigation }) {
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const enviarReporte = () => {
    if (descripcion.trim() === '') {
      setMensaje('⚠️ Por favor describe la falla antes de enviar.');
      return;
    }

    if (modoEdicion && idEditando) {
      const reportesActualizados = reportes.map((r) =>
        r.id === idEditando ? { ...r, descripcion, categoria } : r
      );
      setReportes(reportesActualizados);
      setMensaje('✏️ El reporte ha sido modificado correctamente.');
    } else {
      const nuevoReporte = {
        id: Date.now().toString(),
        descripcion,
        categoria,
      };
      setReportes([nuevoReporte, ...reportes]);
      setMensaje('✅ Tu reporte ha sido enviado correctamente.');
    }

    setDescripcion('');
    setCategoria('');
    setModoEdicion(false);
    setIdEditando(null);
  };

  const eliminarReportes = () => {
    setReportes([]);
    setMensaje('🗑️ Todos los reportes han sido eliminados.');
    setModoEdicion(false);
    setIdEditando(null);
    setDescripcion('');
    setCategoria('');
  };

  const iniciarEdicion = (reporte) => {
    setDescripcion(reporte.descripcion);
    setCategoria(reporte.categoria);
    setModoEdicion(true);
    setIdEditando(reporte.id);
    setMensaje('✏️ Editando reporte...');
  };

  const cancelarEdicion = () => {
    setDescripcion('');
    setCategoria('');
    setModoEdicion(false);
    setIdEditando(null);
    setMensaje('❌ Edición cancelada.');
  };

  return (
    <PantallaBase navigation={navigation}>
      <View style={styles.section}>
        <Text style={styles.title}>Reporte de Fallas</Text>

        <Text style={styles.label}>Describe el problema:</Text>
        <TextInput
          style={styles.inputMultiline}
          multiline
          numberOfLines={5}
          placeholder="Ejemplo: La pantalla de cuestionario no carga..."
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Text style={styles.label}>Categoría del problema:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            <Picker.Item label="Selecciona una categoría..." value="" />
            <Picker.Item label="Interfaz" value="interfaz" />
            <Picker.Item label="Navegación" value="navegacion" />
            <Picker.Item label="Carga de datos" value="datos" />
            <Picker.Item label="Errores visuales" value="visual" />
            <Picker.Item label="Otro" value="otro" />
          </Picker>
        </View>

        <Button
          title={modoEdicion ? 'Guardar cambios' : 'Enviar reporte'}
          onPress={enviarReporte}
        />

        {modoEdicion && (
          <View style={styles.cancelarBoton}>
            <Button title="Cancelar edición" color="#999999" onPress={cancelarEdicion} />
          </View>
        )}

        {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

        <View style={styles.eliminarBoton}>
          <Button title="Eliminar reportes" color="#0000FF" onPress={eliminarReportes} />
        </View>

        <FlatList
          data={reportes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reporteItem}>
              <Text style={styles.reporteTexto}>• {item.descripcion}</Text>
              {item.categoria !== '' && (
                <Text style={styles.categoriaTexto}>Categoría: {item.categoria}</Text>
              )}
              <View style={styles.modificarBoton}>
                <Button title="Modificar" onPress={() => iniciarEdicion(item)} />
              </View>
            </View>
          )}
          ListHeaderComponent={
            reportes.length > 0 ? (
              <Text style={styles.subtitulo}>Reportes enviados:</Text>
            ) : null
          }
        />
      </View>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  mensaje: {
    marginTop: 10,
    fontSize: 15,
    color: '#006600',
    textAlign: 'center',
  },
  eliminarBoton: {
    marginTop: 10,
    marginBottom: 10,
  },
  cancelarBoton: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitulo: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  reporteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  reporteTexto: {
    fontSize: 15,
    color: '#333',
  },
  categoriaTexto: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  modificarBoton: {
    marginTop: 8,
  },
});