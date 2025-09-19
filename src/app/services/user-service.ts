import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth) {}

  // 🔹 Login con email y contraseña
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🔹 Registro con nombre y apellido
  async register(email: string, password: string, data: { name: string, lastname: string }) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    
    await updateProfile(userCredential.user, {
      displayName: `${data.name} ${data.lastname}`
    });

    return userCredential;
  }

  // 🔹 Logout
  logout() {
    return this.auth.signOut();
  }
}