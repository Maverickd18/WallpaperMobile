import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';


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
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async onsubmit() {
    const email = this.emailControl.value ?? '';
    const password = this.passwordControl.value ?? '';

    if (!this.emailControl.valid || !this.passwordControl.valid) {
      this.showAlert('Error', 'Please fill in all fields correctly');
      return;
    }

    try {
      await this.authService.login(email, password);
      this.showAlert('Success', 'Login successful ');
      this.router.navigate(['/home']); 
    } catch (err: any) {
      this.showAlert('Login failed', err.message || 'Invalid credentials');
    }
  }

  gotoregister() {
    this.router.navigate(['/register']);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
