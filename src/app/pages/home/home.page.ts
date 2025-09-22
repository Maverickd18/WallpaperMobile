import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploaderService } from 'src/app/core/providers/uploader/uploader';
import { supabase } from 'src/app/services/databasesupa';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  showSuccess = false;
  images: { url: string, path: string }[] = []; // lista de wallpapers

  private userId: string = '';

  constructor(private router: Router, private uploader: UploaderService) {}

  async ngOnInit() {
    // obtener usuario actual
    const { data } = await supabase.auth.getUser();
    this.userId = data.user?.id || '';

    if (this.userId) {
      await this.loadWallpapers();
    }
  }

 async loadWallpapers() {
  this.images = await this.uploader.list('images', this.userId);
}


  goToProfile() {
    this.router.navigate(['/profile']);
  }

  onLogoutClick() {
    this.router.navigate(['/login']);
  }

  // subir y refrescar
  async onAddWallpaperClick(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const path = await this.uploader.upload('images', this.userId, file.name, file.type, base64);
      if (path) {
        this.showSuccess = true;
        await this.loadWallpapers(); // refrescamos lista
        setTimeout(() => (this.showSuccess = false), 2000);
      }
    };
    reader.readAsDataURL(file);
  }

  // eliminar wallpaper
  async onDeleteWallpaper(path: string) {
    const ok = await this.uploader.remove('images', path);
    if (ok) {
      this.images = this.images.filter(img => img.path !== path);
    }
  }
}
