import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Userdata } from 'src/app/interfaces/userdata';
import { AuthService } from 'src/app/services/auth';
import { Database } from 'src/app/services/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  CONFIRMPasswordControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private database: Database
  ) {}

  ngOnInit() {}

  async onsubmit() {
    if (!this.passwordControl.valid 
      || !this.emailControl.valid 
      || !this.nameControl.valid 
      || !this.lastNameControl.valid) {
      this.showAlert('Error', 'Fill all the fields');
      return;
    }

    if ((this.passwordControl.value ?? '').trim() !== (this.CONFIRMPasswordControl.value ?? '').trim()) {
      this.showAlert('Error', 'Passwords do not match');
      return;
    }

    try {
      await this.authService.register1(
        this.emailControl.value ?? '',
        this.passwordControl.value ?? ''
      );
      const userdata: Userdata={
        name:this.nameControl.value||'',
        lastName:this.lastNameControl.value||'',
        wallpapers:[]
      }
      await this.database.addDocument(userdata,'users');
      this.showAlert('Success', 'User registered successfully ✅');
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.showAlert('Registration failed', err.message || 'Error creating user');
    }
  }

  gotologin() {
    this.router.navigate(['/login']);
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
