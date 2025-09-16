import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServicePublic } from '../../utils/services/api-service-public';
import { UserRegister, UserPublic } from '../../utils/types/user-public';

type User = {
  email: string;
  password: string;
  pseudo: string;
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private apiService: ApiServicePublic, private router: Router) {}

  isSubmitted: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  get token():string |null{
    return this.apiService.getToken();
  }

  newUser: UserRegister = {
    email: '',
    pseudo: '',
    password: '',
  };

    formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  loginUser() {
    this.isSubmitted = true;
    let user = this.form.value as UserRegister;

    this.apiService.login(user).subscribe((res) => {
      console.log('Response', res);
      console.log('Logged!');
      this.router.navigate(['/showToons']);
    });
  }
}
