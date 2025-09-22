import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploaderService } from 'src/app/core/providers/uploader/uploader';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  showSuccess = false; 
  imageUrl: string | null = null; // 👉 aquí guardaremos la URL de la imagen

  constructor(private router: Router, private uploader: UploaderService) {}

  // 👉 Navegar al perfil
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // 👉 Logout
  onLogoutClick() {
    this.router.navigate(['/login']);
  }

  // 👉 Subir wallpaper y mostrarlo
  async onAddWallpaperClick(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const path = await this.uploader.upload('images', file.name, file.type, base64);
        if (path) {
          // ✅ Obtener URL pública temporal
          this.imageUrl = await this.uploader.getUrl('images', path);

          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 2000);
        }
      } catch (err) {
        console.error('⚠️ Error subiendo archivo:', err);
      }
    };
    reader.readAsDataURL(file);
  }
}
