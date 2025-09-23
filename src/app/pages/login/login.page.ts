// src/app/pages/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';
import { TranslationService } from 'src/app/services/translation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    public translate: TranslationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.emailControl.reset();
    this.passwordControl.reset();
  }

  // Método para cambiar idioma
  toggleLanguage() {
    this.translate.toggleLanguage();
  }

  async onsubmit() {
    const email = this.emailControl.value ?? '';
    const password = this.passwordControl.value ?? '';

    if (!this.emailControl.valid || !this.passwordControl.valid) {
      this.showAlert(this.translate.t('common.error'), this.translate.t('login.fillFields'));
      return;
    }

    try {
      await this.authService.login(email, password);
      this.showAlert(this.translate.t('common.success'), this.translate.t('login.successMsg'));
      this.router.navigate(['/home']); 
    } catch (err: any) {
      this.showAlert(
        this.translate.t('login.failedMsg'), 
        err.message || this.translate.t('login.invalidCredentials')
      );
    }
  }

  gotoregister() {
    this.router.navigate(['/register']);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [this.translate.t('common.ok')]
    });
    await alert.present();
  }
}