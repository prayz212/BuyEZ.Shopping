import { Routes } from '@angular/router';
import { SignInComponent } from './features/accounts/views/sign-in/sign-in.component';
import { SignUpComponent } from './features/accounts/views/sign-up/sign-up.component';
import { HomeComponent } from './features/home/views/home/home.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
