import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from '../../users/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(UserStore);
  private router = inject(Router);

  loginForm = this.fb.group({
    dsLogin: ['', [Validators.required]],
    dsContraseña: ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/usuarios']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.login(this.loginForm.value).subscribe({
        next: (res) => {
          // Si entra acá, es porque .NET devolvió Ok() con el Token
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          // Si entra acá, es porque .NET devolvió BadRequest()
          // Mostramos una alerta o dejamos que tu ErrorInterceptor haga lo suyo
          alert('Usuario o contraseña incorrectos');
          console.error('Login falló:', err);
        }
      });
    }
  }
}