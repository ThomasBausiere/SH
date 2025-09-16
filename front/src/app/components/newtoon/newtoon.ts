import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceProtected } from '../../utils/services/api-service-protected';
import { ToonCreateRequest } from '../../utils/types/toon-type';

@Component({
  selector: 'app-newtoon',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './newtoon.html',
  styleUrl: './newtoon.css'
})
export class Newtoon implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiServiceProtected);
  private router = inject(Router);

  form!: FormGroup;
  submitting = false;
  error: string | null = null;

    professions: string[] = [
    'WARRIOR',
    'RANGER',
    'ASSASSIN',
    'MONK',
    'NECROMANCER',
    'MESMER',
    'ELEMENTALIST',
    'RITUALIST',
    'DERVISH',
    'PARAGON'
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      profession: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawUserId = localStorage.getItem('userId');
    const userId = rawUserId ? Number(rawUserId) : null;
    if (!userId || Number.isNaN(userId)) {
      this.error = 'Non logged user.';
      return;
    }

    const payload: ToonCreateRequest = {
      name: this.f['name'].value.trim(),
      profession: this.f['profession'].value,
    };

    this.submitting = true;
    this.api.createToonForUser(userId, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/showToons']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error. Try Later.';
        this.submitting = false;
      },
    });
  }

}
