// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';
import { TranslationService } from 'src/app/services/translation';

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
    private router: Router,
    public translate: TranslationService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
    });

    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.uid = user.uid;
        const profile = await this.authService.getUserProfile(user.uid);
        if (profile) {
          this.profileForm.patchValue(profile);
        } else {
          this.profileForm.patchValue({
            email: user.email ?? ''
          });
        }
      }
    });
  }

  // Método para cambiar idioma
  toggleLanguage() {
    this.translate.toggleLanguage();
  }

  getControl(control: string): FormControl {
    return this.profileForm.get(control) as FormControl;
  }

  async onUpdate() {
    if (this.profileForm.invalid || !this.uid) return;

    try {
      const { name, lastName } = this.profileForm.getRawValue();

      await this.authService.updateUser({ name, lastName });

      this.successMsg = this.translate.t('profile.updateSuccess');
      this.errorMsg = '';

      const toast = await this.toastCtrl.create({
        message: this.translate.t('profile.updateSuccess'),
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (err: any) {
      console.error(err);
      this.errorMsg = this.translate.t('profile.updateError');
      this.successMsg = '';

      const toast = await this.toastCtrl.create({
        message: this.translate.t('profile.updateError'),
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