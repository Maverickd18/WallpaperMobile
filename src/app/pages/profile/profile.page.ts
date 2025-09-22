import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';  // tu AuthService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  errorMsg = '';
  successMsg = '';
  uid: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]] // 🔒 email bloqueado
    });

    // ✅ escuchamos usuario logueado
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.uid = user.uid;
        const profile = await this.authService.getUserProfile(user.uid);
        if (profile) {
          this.profileForm.patchValue(profile);
        } else {
          // si no hay doc en Firestore, rellenamos con email
          this.profileForm.patchValue({
            email: user.email ?? ''
          });
        }
      }
    });
  }

  getControl(control: string): FormControl {
    return this.profileForm.get(control) as FormControl;
  }

  // ✅ actualizar perfil (solo nombre y apellido)
  async onUpdate() {
    if (this.profileForm.invalid || !this.uid) return;

    try {
      const { name, lastName } = this.profileForm.getRawValue();

      await this.authService.updateUser({ name, lastName });

      this.successMsg = 'Perfil actualizado ✅';
      this.errorMsg = '';

      const toast = await this.toastCtrl.create({
        message: 'Perfil actualizado ✅',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (err: any) {
      console.error(err);
      this.errorMsg = 'Error al actualizar ❌';
      this.successMsg = '';

      const toast = await this.toastCtrl.create({
        message: 'Error al actualizar ❌',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
