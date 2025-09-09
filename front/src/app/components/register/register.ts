import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UserType } from '../../utils/types/user-type';
import { ApiServicePublic } from '../../utils/services/api-service-public';
@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit, OnDestroy {
  constructor(private apiService: ApiServicePublic, private router: Router) {}
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: UserType = this.registerForm.value;

      this.apiService.register(newUser).subscribe({
        next: (user) => {
          console.log('Utilisateur créé :', user);
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.error('Erreur lors de la création ', err);
        },
      });
    } else {
      console.warn('Le formulaire est invalide ');
      this.registerForm.markAllAsTouched();
    }
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
}