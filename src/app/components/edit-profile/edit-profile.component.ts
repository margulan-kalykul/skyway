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
    // TODO: Send the update data if implemented
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
    });
  }
}
