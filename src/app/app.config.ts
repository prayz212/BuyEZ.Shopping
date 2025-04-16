import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import {
  apiInterceptor,
  errorInterceptor,
  loadingInterceptor,
} from './core/interceptors';
import {
  AccountService,
  CatalogService,
  LoadingService,
  OrderService,
} from './core/services';
import * as AccountEffects from './features/accounts/store/account.effects';
import { accountReducer } from './features/accounts/store/account.reducer';
import * as CartEffects from './features/carts/store/cart.effects';
import { cartReducer } from './features/carts/store/cart.reducer';
import * as ProductEffects from './features/products/store/product.effects';
import { productReducer } from './features/products/store/product.reducer';
import * as GlobalSettingsEffects from './store/global.effects';
import { globalSettingsReducer } from './store/global.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      globalSettings: globalSettingsReducer,
      account: accountReducer,
      product: productReducer,
      cart: cartReducer,
    }),
    provideEffects([
      GlobalSettingsEffects,
      AccountEffects,
      ProductEffects,
      CartEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),

    provideHttpClient(
      withInterceptors([apiInterceptor, loadingInterceptor, errorInterceptor])
    ),

    AccountService,
    CatalogService,
    OrderService,
    LoadingService,
    MessageService,
  ],
};
