import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '@app/features/auth/session.service';
import { RouterModule } from '@angular/router';
import { customEmailValidator } from '@app/features/auth/auth.validators';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="flex h-screen w-screen items-center justify-center">
      <div class="w-full max-w-[360px]">
        <h1 class="mb-8 text-center text-lg font-medium">Iniciar Sesión</h1>
        <form
          autocomplete="off"
          [formGroup]="loginForm"
          (ngSubmit)="logIn()"
          class="mb-8"
        >
          <div class="mb-4 flex flex-col">
            <label for="emailInput" class="mb-1 text-sm">Correo</label>
            <input
              type="email"
              class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
              id="emailInput"
              placeholder="name@example.com"
              formControlName="email"
            />
          </div>
          <div class="mb-4 flex flex-col">
            <label for="passwordInput" class="mb-1 text-sm">Contraseña</label>
            <input
              type="password"
              class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
              id="passwordInput"
              placeholder="Password"
              formControlName="password"
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-slate-200 py-3 text-sm font-medium"
          >
            Iniciar Sesión
          </button>
        </form>
        <p class="mb-0 text-center">
          ¿No tienes una cuenta?,
          <a class="underline" [routerLink]="['/auth', 'signup']"
            >Crea una cuena aquí.</a
          >
        </p>
      </div>
    </div>
  `,
})
export class LoginPage {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _sessionService = inject(SessionService);

  public loginForm = this._formBuilder.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.minLength(3), customEmailValidator],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public logIn(): void {
    const credentials = this.loginForm.getRawValue();

    this._sessionService.logInUser(credentials).subscribe((res) => {
      console.log('User logged');
    });
  }
}
