// home.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploaderService } from 'src/app/core/providers/uploader/uploader';
import { AuthService } from 'src/app/services/auth';
import { WallpaperService } from 'src/app/services/wallpaper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  wallpapers: { id: string; url: string; path: string; name: string }[] = [];
  showSuccess = false;
  uid = '';

  constructor(
    private uploader: UploaderService,
    private authService: AuthService,
    private wallpaperService: WallpaperService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.uid = user.uid;
        await this.loadWallpapers();
      } else {
        this.wallpapers = [];
      }
    });
  }

  async loadWallpapers() {
    this.wallpapers = await this.wallpaperService.listByUser(this.uid);
  }

  async onAddWallpaperClick(event: any) {
    const file = event.target.files?.[0];
    if (!file || !this.uid) return;

    try {
      const res = await this.uploader.uploadFile('images', this.uid, file);
      const id = await this.wallpaperService.add(this.uid, res.path, res.publicUrl, file.name);
      // actualizar la lista en UI
this.wallpapers.unshift({ 
  id, 
  path: res.path, 
  url: res.publicUrl, 
  name: file.name 
});
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000);
    } catch (err) {
      console.error('Error subiendo wallpaper:', err);
    }
  }

  async deleteWallpaper(wp: { id: string; path: string }) {
    try {
      await this.uploader.deleteFile('images', wp.path);
      await this.wallpaperService.deleteMetadata(wp.id);
      this.wallpapers = this.wallpapers.filter(w => w.id !== wp.id);
    } catch (err) {
      console.error('Error eliminando wallpaper:', err);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    // navegar
  }

  onLogoutClick() {
    // cerrar sesión
  }
}
