import { Component, Input, signal } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToursService } from '../../services/tours.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  tourForm: FormGroup;
  tourImages: File[] = [];
  tourCreateSuccess = signal(false);

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    private authService: AuthService,
  ) {
    this.tourForm = this.fb.group({
      route: [''],
      desc: [''],
    });
  }

  filesSelected(event: any) {
    let images: FileList = event.target.files;

    if (images) {
      this.tourImages = Array.from(images);
      
    }
  }

  async createTour() {
    if (this.tourForm.value.route && this.tourForm.value.desc && this.tourImages.length > 0) {
      let formData = new FormData();

      formData.append('description', this.tourForm.value.desc);
      formData.append('route', this.tourForm.value.route);
      for (let image of this.tourImages) {
        formData.append('images', image, image.name);
      }
      console.log(formData);

      // this.toursService.createTour(formData).subscribe({
      //   next: (response) => {
      //     this.tourForm.reset({route: '', desc: ''});
      //     this.tourCreateSuccess.set(true);
      //     console.log('Created tour: ', response);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   }
      // });
      try {
        const response = await fetch(`${this.toursService.BASE_URL}/provider/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authService.getToken()!}`
          },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        this.tourForm.reset({route: '', desc: ''});
        this.tourCreateSuccess.set(true);
        setTimeout(() => {
          this.tourCreateSuccess.set(false);
        }, 1000);
        console.log('Created tour: ', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      alert('Fill all the fields');
    }
  }
}
