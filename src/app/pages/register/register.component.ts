import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from "../../components/header/header.component";
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RegisterForm, UserCredentials} from '../../models/interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    filePaths = {
        terms: "https://docs.google.com/document/d/1MomfzGKo3FumSV9ACjVe-Dm6o2RUhs_RLBBsVeojPIA/edit?usp=sharing",
        privacy: "https://docs.google.com/document/d/1boK_WokBCDM2i4Lz-7gj1m12PUTQ5juAtVhck05PpNw/edit?usp=sharing",
    };
    registerForm: FormGroup;
    loading = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.registerForm = this.fb.group({
            login: ['',
                 
            ],
            lastName: ['', ],
            email: ['', ],
            password: ['',
                 
            ]
        });
    }

    onSubmit() {
        let credentials: RegisterForm = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            username: this.registerForm.value.login,
        }
        this.register(credentials);
    }

    register(credentials: RegisterForm): void {
        this.loading = true;
        console.log(credentials);
        this.authService.register(credentials).subscribe({
            next: response => {
                console.log(response);
                localStorage.setItem('session_id', response.session_id);
                setTimeout(() => {
                    this.router.navigate(['verify', ]);
                }, 500);
            },
            error: (err) => {
                console.error('Register error: ', err);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
