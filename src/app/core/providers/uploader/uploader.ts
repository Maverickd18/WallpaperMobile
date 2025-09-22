// src/app/services/uploader.service.ts
import { Injectable } from '@angular/core';
import { supabase } from 'src/app/services/databasesupa';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  // 📤 Subir archivo
  async upload(bucket: string, userId: string, name: string, type: string, base64: string): Promise<string> {
    try {
      const filePath = `${userId}/${Date.now()}-${name}`; // guardamos en carpeta del usuario
      const { data, error } = await supabase.storage.from(bucket).upload(
        filePath,
        Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)),
        { contentType: type, upsert: true, cacheControl: '3600' }
      );
      if (error) throw error;
      return data?.path ?? '';
    } catch (err) {
      console.error('Error al subir:', err);
      return '';
    }
  }

  //  URL firmada
  async getUrl(bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
    if (error) {
      console.error('Error URL:', error);
      return '';
    }
    return data?.signedUrl ?? '';
  }

// 📋 Listar imágenes del usuario con url y path
async list(bucket: string, userId: string): Promise<{ url: string; path: string }[]> {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(userId, { limit: 50 });
    if (error) throw error;

    const results: { url: string; path: string }[] = [];
    for (const file of data || []) {
      const fullPath = `${userId}/${file.name}`;
      const signedUrl = await this.getUrl(bucket, fullPath);
      if (signedUrl) {
        results.push({ url: signedUrl, path: fullPath });
      }
    }
    return results;
  } catch (err) {
    console.error(' Error al listar:', err);
    return [];
  }
}


  //  Eliminar imagen
  async remove(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error(' Error al eliminar:', err);
      return false;
    }
  }
}
