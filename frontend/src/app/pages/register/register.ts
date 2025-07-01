import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  loading = false;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        let message = 'Registration failed';
        if (error?.error) {
          const errors = error.error;
          // Get the first error array and its first message
          const firstKey = Object.keys(errors)[0];
          if (firstKey && Array.isArray(errors[firstKey])) {
            message = errors[firstKey][0];
          }
        }
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
        });
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
