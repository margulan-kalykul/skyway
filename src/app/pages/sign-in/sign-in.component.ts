import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentials } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  filePaths = {
    terms: "https://docs.google.com/document/d/1MomfzGKo3FumSV9ACjVe-Dm6o2RUhs_RLBBsVeojPIA/edit?usp=sharing",
    privacy: "https://docs.google.com/document/d/1boK_WokBCDM2i4Lz-7gj1m12PUTQ5juAtVhck05PpNw/edit?usp=sharing",
  };
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
