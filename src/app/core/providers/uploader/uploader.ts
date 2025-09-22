import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabase = createClient(
  environment.SUPABASE.URL,
  environment.SUPABASE.API_KEY
);;

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  // Subir archivo y devolver path + URL pública
  async uploadFile(
    bucket: string,
    userUid: string,
    file: File
  ): Promise<{ path: string; publicUrl: string }> {
    const path = `${userUid}/${file.name}`;

    // Subir archivo
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return {
      path,
      publicUrl: publicData.publicUrl,
    };
  }

  // Eliminar archivo
  async deleteFile(bucket: string, path: string): Promise<boolean> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  }
}
