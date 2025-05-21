import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserCredentials } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, NgIf, NgTemplateOutlet],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  filePaths = {
    terms: "https://docs.google.com/document/d/1MomfzGKo3FumSV9ACjVe-Dm6o2RUhs_RLBBsVeojPIA/edit?usp=sharing",
    privacy: "https://docs.google.com/document/d/1boK_WokBCDM2i4Lz-7gj1m12PUTQ5juAtVhck05PpNw/edit?usp=sharing",
  };
  loginForm: FormGroup;
  loading = false;

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
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    // }
  }

  login(credentials: UserCredentials): void {
    // TODO: this wasn't tested
    this.loading = true;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveCredentials(response.token);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 500);
      },
      error: (err) => {
        console.error('Login error: ', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
