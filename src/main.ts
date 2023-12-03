import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
