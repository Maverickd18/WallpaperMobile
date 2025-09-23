// src/app/services/translation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage$ = new BehaviorSubject<Language>('en');
  
  private translations: Translations = {
    // Common
    'common.back': { en: 'BACK', es: 'VOLVER' },
    'common.logout': { en: 'LOG OUT', es: 'CERRAR SESIÓN' },
    'common.success': { en: 'Success', es: 'Éxito' },
    'common.error': { en: 'Error', es: 'Error' },
    'common.ok': { en: 'OK', es: 'OK' },
    'common.cancel': { en: 'Cancel', es: 'Cancelar' },
    
    // Login Page
    'login.title': { en: 'WALLPAPERS MDJDS', es: 'FONDOS MDJDS' },
    'login.subtitle': { en: 'YOU CAN CHOOSE AN AMAZING WALLPAPER', es: 'PUEDES ELEGIR UN FONDO INCREÍBLE' },
    'login.email': { en: 'EMAIL', es: 'CORREO ELECTRÓNICO' },
    'login.password': { en: 'PASSWORD', es: 'CONTRASEÑA' },
    'login.loginBtn': { en: 'LOG IN', es: 'INICIAR SESIÓN' },
    'login.registerBtn': { en: 'REGISTER', es: 'REGISTRARSE' },
    'login.fillFields': { en: 'Please fill in all fields correctly', es: 'Por favor complete todos los campos correctamente' },
    'login.successMsg': { en: 'Login successful', es: 'Inicio de sesión exitoso' },
    'login.failedMsg': { en: 'Login failed', es: 'Error al iniciar sesión' },
    'login.invalidCredentials': { en: 'Invalid credentials', es: 'Credenciales inválidas' },
    
    // Register Page
    'register.title': { en: 'Create Account', es: 'Crear Cuenta' },
    'register.subtitle': { en: 'Join us and explore amazing wallpapers', es: 'Únete y explora fondos increíbles' },
    'register.name': { en: 'NAME', es: 'NOMBRE' },
    'register.lastname': { en: 'LASTNAME', es: 'APELLIDO' },
    'register.email': { en: 'EMAIL', es: 'CORREO ELECTRÓNICO' },
    'register.password': { en: 'PASSWORD', es: 'CONTRASEÑA' },
    'register.confirmPassword': { en: 'CONFIRM PASSWORD', es: 'CONFIRMAR CONTRASEÑA' },
    'register.registerBtn': { en: 'REGISTER', es: 'REGISTRARSE' },
    'register.backBtn': { en: 'BACK', es: 'VOLVER' },
    'register.fillFields': { en: 'Fill all the fields', es: 'Complete todos los campos' },
    'register.passwordsNoMatch': { en: 'Passwords do not match', es: 'Las contraseñas no coinciden' },
    'register.successMsg': { en: 'User registered successfully ✅', es: 'Usuario registrado exitosamente ✅' },
    'register.failedMsg': { en: 'Registration failed', es: 'Error en el registro' },
    'register.errorCreatingUser': { en: 'Error creating user', es: 'Error al crear usuario' },
    
    // Home Page
    'home.title': { en: 'Your Wallpapers', es: 'Tus Fondos de Pantalla' },
    'home.delete': { en: 'DELETE', es: 'ELIMINAR' },
    'home.addWallpaper': { en: 'ADD WALLPAPER', es: 'AGREGAR FONDO' },
    'home.profile': { en: 'Profile', es: 'Perfil' },
    'home.noWallpapers': { en: 'No wallpapers yet', es: 'Aún no tienes fondos' },
    'home.deleteConfirm': { en: 'Are you sure you want to delete this wallpaper?', es: '¿Estás seguro de eliminar este fondo?' },
    
    // Profile Page
    'profile.title': { en: 'My Profile', es: 'Mi Perfil' },
    'profile.subtitle': { en: 'Update your personal information', es: 'Actualiza tu información personal' },
    'profile.name': { en: 'NAME', es: 'NOMBRE' },
    'profile.lastname': { en: 'LASTNAME', es: 'APELLIDO' },
    'profile.email': { en: 'EMAIL', es: 'CORREO ELECTRÓNICO' },
    'profile.update': { en: 'UPDATE', es: 'ACTUALIZAR' },
    'profile.backToHome': { en: 'BACK TO HOME', es: 'VOLVER AL INICIO' },
    'profile.updateSuccess': { en: 'Profile updated ✅', es: 'Perfil actualizado ✅' },
    'profile.updateError': { en: 'Error updating ❌', es: 'Error al actualizar ❌' },
    
    // Language Switch
    'language.switchTo': { en: '🇪🇸 Español', es: '🇺🇸 English' },
    'language.current': { en: 'English', es: 'Español' }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      this.currentLanguage$.next(savedLang);
    }
  }

  get currentLanguage() {
    return this.currentLanguage$.asObservable();
  }

  get currentLang(): Language {
    return this.currentLanguage$.value;
  }

  setLanguage(lang: Language) {
    this.currentLanguage$.next(lang);
    localStorage.setItem('app-language', lang);
  }

  toggleLanguage() {
    const newLang: Language = this.currentLang === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
    return translation[this.currentLang] || key;
  }

  // Shorthand method
  t(key: string): string {
    return this.translate(key);
  }
}