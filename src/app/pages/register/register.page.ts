import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  nameControl: FormControl = new FormControl('', [Validators.required])
  lastNameControl: FormControl = new FormControl('', [Validators.required])
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email])
  passwordControl: FormControl = new FormControl('', [Validators.required])
  CONFIRMPasswordControl: FormControl = new FormControl('', [Validators.required])
  constructor( private router: Router,private alertCtrl: AlertController) { }

  ngOnInit() {
    
  }

  async onsubmit() {

// Verifica si los campos están vacíos
  if (!this.passwordControl.valid 
    || !this.emailControl.valid 
    || !this.nameControl.valid 
    || !this.lastNameControl.valid ) {
    console.log('fill all the fields');
    return;
  }

  // Verifica el formato del email
  if (!this.emailControl.valid) {
    console.log('Invalid email format');
    return;
  }


   
 if (this.passwordControl.value.trim() !== this.CONFIRMPasswordControl.value.trim()) {
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'Passwords do not match',
    buttons: ['OK']
  });
  await alert.present();
  return;
}


  }

  gotologin() {
    this.router.navigate(['/login']);
  }
}

