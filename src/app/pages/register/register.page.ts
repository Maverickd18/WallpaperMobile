import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      this.errorMsg = 'Por favor completa todos los campos';
      return;
    }

    const { name, lastname, email, password, confirm } = this.registerForm.value;

    if (password !== confirm) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.userService.register(email, password, { name, lastname });
this.router.navigate(['/home']);
    } catch (err) {
      this.errorMsg = 'Error al registrar usuario';
    }
  }
}
