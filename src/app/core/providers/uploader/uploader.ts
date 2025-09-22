// src/app/services/uploader.service.ts
import { Injectable } from '@angular/core';
import { supabase } from 'src/app/services/databasesupa';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  /**
   * 📤 Sube un archivo al bucket de Supabase
   * @param bucket - nombre del bucket
   * @param name - nombre con el que se guardará
   * @param type - content-type (ej: image/png, image/jpeg)
   * @param base64 - archivo convertido en base64 (sin el prefijo data:image/...)
   */
  async upload(bucket: string, name: string, type: string, base64: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage.from(bucket).upload(
        `images/${name}`,
        Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)),
        {
          contentType: type,
          upsert: true,
          cacheControl: '3600',
        }
      );

      if (error) throw error;

      console.log('✅ Imagen subida en Supabase:', data);
      return data?.path ?? '';
    } catch (err) {
      console.error('❌ Error al subir imagen:', err);
      return '';
    }
  }

  /**
   * 🌐 Genera una URL firmada temporal (default: 1h)
   * @param bucket - nombre del bucket
   * @param path - ruta del archivo dentro del bucket
   */
  async getUrl(bucket: string, path: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 3600);

      if (error) throw error;

      console.log('🌐 URL generada:', data?.signedUrl);
      return data?.signedUrl ?? '';
    } catch (err) {
      console.error('❌ Error al obtener URL firmada:', err);
      return '';
    }
  }
}
