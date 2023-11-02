import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  rutErrorFormato: boolean = false;
  credencialesError: boolean = false;
  loginForm: FormGroup;
  usernameError: boolean = false;
  passwordError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.validarRut]],
      password: ['', [Validators.required]]
    });

    const usernameControl = this.loginForm.get('username');

    if (usernameControl) {
      usernameControl.valueChanges.subscribe(() => {
        this.usernameError = usernameControl.hasError('invalidRut');
      });
    }
  }

  // Validador de RUT
  validarRut(control: any) {
    const rut = control.value;
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-(\d|k|K)$/;

    if (!rutPattern.test(rut)) {
      return { invalidRut: true };
    } else {
      return null;
    }
  }

  limpiarErrorFormato() {
    this.loginForm.controls['username'].setErrors(null); // Esto restablecerá la validación del RUT
  }

  login(): void {
    this.usernameError = false;
    this.passwordError = false;
  
    const loginForm = this.loginForm; // Guarda una referencia al formulario reactivo
  
    if (loginForm) { // Verifica que el formulario no sea nulo
      const usernameControl = loginForm.get('username');
      const passwordControl = loginForm.get('password');
  
      if (usernameControl && passwordControl) { // Verifica que los controles no sean nulos
        const username = usernameControl.value;
        const password = passwordControl.value;
  
        if (loginForm.valid) {
          this.authService.login(username, password).subscribe((result) => {
            if (result) {
              this.router.navigate(['/resumen']);
            } else {
              this.credencialesError = true;
  
              if (usernameControl.invalid) {
                this.rutErrorFormato = true;
              }
            }
          });
        }
      }
    }
  }
}