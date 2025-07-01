import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading = false;
  loginForm!: FormGroup;

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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        let message = 'Login failed';
        if (error?.error) {
          const errors = error.error;
          const firstKey = Object.keys(errors)[0];
          if (firstKey && Array.isArray(errors[firstKey])) {
            message = errors[firstKey][0];
          } else if (typeof errors === 'string') {
            message = errors;
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
