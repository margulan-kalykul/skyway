import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  @Input() username = '';
  @Input() email = '';

  constructor(private fb: FormBuilder) {
     
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
    });
  }
}
