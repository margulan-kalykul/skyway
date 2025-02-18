import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';

export const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', redirectTo: 'home' }, // TODO: Reset password functionality
    { path: 'tours/:tourId', component: TourDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
