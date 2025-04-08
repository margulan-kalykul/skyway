import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentials } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', 
        // [Validators.required, Validators.email]
      ],
      password: ['', 
        // [Validators.required, Validators.minLength(6)]
      ]
    });
  }

  onSubmit() {
    let credentials: UserCredentials = {
      username: this.loginForm.value.login,
      password: this.loginForm.value.password
    }
    this.login(credentials);
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 500);
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    // }
  }

  login(credentials: UserCredentials): void {
    this.authService.login(credentials);
  }
}
