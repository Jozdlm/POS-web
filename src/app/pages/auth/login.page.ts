import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '@app/features/auth/session.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="wrapper">
      <h1 class="text-center mb-4 fs-2">Iniciar Sesión</h1>
      <form autocomplete="off" [formGroup]="loginForm" (ngSubmit)="logIn()">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="emailInput"
            placeholder="name@example.com"
            formControlName="email"
          />
          <label for="emailInput">Correo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
            formControlName="password"
          />
          <label for="passwordInput">Contraseña</label>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary p-3">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _sessionService = inject(SessionService);

  // TODO: Validate if the email is valide with custom validator
  public loginForm = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public logIn(): void {
    const credentials = this.loginForm.getRawValue();

    this._sessionService.logInUser(credentials).subscribe((res) => {
      console.log('User logged');
    });
  }
}
