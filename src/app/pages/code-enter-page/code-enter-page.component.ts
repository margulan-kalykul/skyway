import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from "../../components/header/header.component";
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RegisterForm, UserCredentials} from '../../models/interfaces';

@Component({
  selector: 'app-code-enter-page',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './code-enter-page.component.html',
  styleUrl: './code-enter-page.component.css'
})
export class CodeEnterPageComponent {
  codeForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.codeForm = this.fb.group({
          code: ['', ],
      });
  }

  onSubmit() {
    this.loading = true;
    this.authService.confirmCode(this.codeForm.value.code).subscribe({
        next: response => {
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['sign-in', ]);
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
