import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxStripe } from 'ngx-stripe';

import { routes } from './app.routes';
import { ToursService } from './services/tours.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ToursService,
    provideHttpClient(), provideAnimationsAsync(),
    provideNgxStripe('pk_test_51RJTVQIvMkUocj5Eecr83VrhiauEWEzkk2NuWUUpMdcuHPOPrgXghkvGIJLIZjLuDDlWkdJ9LtAVNrqyOgVlYlUf00FHIQN4Mz'),
  ]
};
