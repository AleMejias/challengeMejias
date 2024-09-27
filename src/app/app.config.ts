import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes) , 
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    importProvidersFrom([
      BrowserAnimationsModule,
      DialogService,
      MessageService
    ]),
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  ]
};
