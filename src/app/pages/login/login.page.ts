import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {
emailcontrol:FormControl = new FormControl('', [Validators.required, Validators.email]);
passwordcontrol:FormControl = new FormControl('', [Validators.required,Validators.minLength(6)]);

  constructor( private router:Router,){ }

  ngOnInit() {

  }
    onsubmit() {
    const email = this.emailcontrol.value;
    const password = this.passwordcontrol.value;
    }

  gotoregister(){
    this.router.navigate(['/register']);
  }

}
