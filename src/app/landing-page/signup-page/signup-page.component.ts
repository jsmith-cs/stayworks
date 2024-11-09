import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterLink]
})
export class SignupPageComponent {
  signupForm: FormGroup;
  years: number[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  passwordRequirements = {
    length: false,
    uppercase: false,
    number: false,
    special: false
  };
  emailExists: boolean = false;
  allRequirementsMet: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/)
      ]],
      confirmPassword: ['', Validators.required],
      dobYear: ['', Validators.required],
      dobMonth: ['', Validators.required],
      dobDay: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });

    this.signupForm.get('password')?.valueChanges.subscribe(
      (password: string) => this.checkPasswordStrength(password)
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { mismatch: true };
  }

  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordRequirements = {
        length: false,
        uppercase: false,
        number: false,
        special: false
      };
      this.allRequirementsMet = false;
      return;
    }

    this.passwordRequirements.length = password.length >= 8;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.number = /[0-9]/.test(password);
    this.passwordRequirements.special = /[!@#$%^&*]/.test(password);

    this.allRequirementsMet = 
      this.passwordRequirements.length && 
      this.passwordRequirements.uppercase && 
      this.passwordRequirements.number && 
      this.passwordRequirements.special;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const dateOfBirth = `${formData.dobYear}-${this.months.indexOf(formData.dobMonth) + 1}-${formData.dobDay}`;
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        dateOfBirth: dateOfBirth
      };

      this.http.post('http://localhost:5000/api/auth/signup', signupData).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed', error);
          if (error.error.msg === 'User already exists') {
            this.emailExists = true;
          }
        }
      );
    }
  }
}