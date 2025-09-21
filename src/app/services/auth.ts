import { Injectable } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User, 
  updateEmail 
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  //  Registrar usuario y guardar en Firestore
  async register(email: string, password: string, extraData: { name: string; lastName: string }) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const userRef = doc(this.firestore, `users/${cred.user.uid}`);
    await setDoc(userRef, {
      uid: cred.user.uid,
      email,
      ...extraData
    });
    return cred;
  }

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Otra forma de registrar
  register1(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // Saber si está autenticado
  isauthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  // Estado del usuario como observable
  getCurrentUser(): Observable<User | null> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }

 //  Actualizar perfil (solo nombre y apellido)
async updateUser(data: { name: string; lastName: string }) {
  if (!this.auth.currentUser) throw new Error('No user logged in');
  const uid = this.auth.currentUser.uid;

  // 🔹 1. NO tocamos el email, solo nombre y apellido
  const userRef = doc(this.firestore, `users/${uid}`);
  await updateDoc(userRef, {
    name: data.name,
    lastName: data.lastName
  });
}

  //  Obtener perfil desde Firestore
  async getUserProfile(uid: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  }
}
