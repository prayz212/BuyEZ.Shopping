import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { take } from 'rxjs';
import { SignInRequest } from '../../models/api.model';
import { AccountActions } from '../../store/account.actions';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    DividerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signinForm: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions
  ) {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const credentials: SignInRequest = this.signinForm.value;
    this.store.dispatch(AccountActions.login({ credentials }));

    this.actions$
      .pipe(ofType(AccountActions.loginSuccess), take(1))
      .subscribe(() => this.router.navigate(['home']));
  }
}
