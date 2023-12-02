import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '@app/auth/services/session.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _sessionService = inject(SessionService);

  // TODO: Validate if the email is valide with custom validator
  public loginForm = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public async login() {
    const credentials = this.loginForm.getRawValue();
    // TODO: Create a handler to show an error in the template
    await this._sessionService.login(credentials);
  }
}
