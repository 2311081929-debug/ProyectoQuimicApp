import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { auth, db } from '../Config/FireBaseConfig';

export const registrarUsuario = async (email, password, nombre, hobby) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;
  await setDoc(doc(db, 'users', uid), { nombre, hobby, email });
};

export const iniciarSesion = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const obtenerPreguntasCuestionario = async () => {
  const preguntasRef = collection(db, 'cuestionario');
  const snapshot = await getDocs(preguntasRef);
  return snapshot.docs.map(doc => doc.data());
};

export const obtenerRespuestasCorrectas = async () => {
  const docRef = doc(db, 'RespuestaCuestionario', 'npmgvtBp2uK5AadElK59'); // Reemplaza con el ID real del documento
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().respuestas;
  }
  return [];
};