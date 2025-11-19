import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PantallaBase from '../components/PantallaBase';
import { obtenerRespuestasCorrectas } from '../Services/AuthService';

const preguntas = [
  {
    pregunta: '¿Cuál es el símbolo químico del oxígeno?',
    opciones: ['Ox', 'O', 'Oz', 'Oxg'],
  },
  {
    pregunta: '¿Qué tipo de enlace une dos átomos de hidrógeno en H₂?',
    opciones: ['Iónico', 'Covalente', 'Metálico', 'Puente de hidrógeno'],
  },
  {
    pregunta: '¿Cuál es el pH de una solución neutra?',
    opciones: ['0', '7', '14', '5'],
  },
  {
    pregunta: '¿Qué partícula tiene carga negativa?',
    opciones: ['Protón', 'Neutrón', 'Electrón', 'Ión positivo'],
  },
  {
    pregunta: '¿Qué gas se libera en la fotosíntesis?',
    opciones: ['Dióxido de carbono', 'Oxígeno', 'Nitrógeno', 'Hidrógeno'],
  },
  {
    pregunta: '¿Cuál es el número atómico del carbono?',
    opciones: ['6', '12', '8', '4'],
  },
  {
    pregunta: '¿Qué tipo de cambio ocurre al quemar papel?',
    opciones: ['Físico', 'Químico', 'Reversible', 'Ninguno'],
  },
  {
    pregunta: '¿Qué compuesto tiene la fórmula H₂O?',
    opciones: ['Ácido clorhídrico', 'Agua', 'Peróxido de hidrógeno', 'Oxígeno'],
  },
  {
    pregunta: '¿Qué elemento es líquido a temperatura ambiente?',
    opciones: ['Mercurio', 'Hierro', 'Oxígeno', 'Carbono'],
  },
  {
    pregunta: '¿Qué propiedad permite a los metales conducir electricidad?',
    opciones: ['Maleabilidad', 'Conductividad térmica', 'Electrones libres', 'Dureza'],
  },
];

export default function Cuestionario({ navigation }) {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [respuestasCorrectas, setRespuestasCorrectas] = useState([]);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const cargarRespuestas = async () => {
      const respuestasDB = await obtenerRespuestasCorrectas();
      setRespuestasCorrectas(respuestasDB);
    };
    cargarRespuestas();
  }, []);

  const seleccionarOpcion = (indicePregunta, indiceOpcion) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indicePregunta] = indiceOpcion;
    setRespuestas(nuevasRespuestas);
  };

  const enviarRespuestas = () => {
    let correctas = 0;
    respuestas.forEach((respuesta, i) => {
      if (
        respuestasCorrectas[i] !== undefined &&
        respuesta === respuestasCorrectas[i]
      ) {
        correctas++;
      }
    });
    setResultado(`Respuestas correctas: ${correctas} de ${preguntas.length}`);
  };

  return (
    <PantallaBase navigation={navigation}>
      <View style={styles.section}>
        <Text style={styles.title}>Cuestionario de Química</Text>
        {preguntas.map((p, i) => (
          <View key={i} style={styles.pregunta}>
            <Text style={styles.preguntaTexto}>{`${i + 1}. ${p.pregunta}`}</Text>
            {p.opciones.map((opcion, j) => (
              <TouchableOpacity
                key={j}
                style={[
                  styles.opcion,
                  respuestas[i] === j && styles.opcionSeleccionada,
                ]}
                onPress={() => seleccionarOpcion(i, j)}
              >
                <Text style={styles.opcionTexto}>{opcion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <Button title="Enviar respuestas" onPress={enviarRespuestas} />
        {resultado && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    paddingBottom: 40,
    backgroundColor: '#03BB85',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  pregunta: {
    marginBottom: 20,
  },
  preguntaTexto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  opcion: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 5,
  },
  opcionSeleccionada: {
    backgroundColor: '#03b2bb',
  },
  opcionTexto: {
    fontSize: 15,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
});