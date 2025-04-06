import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: 'auth', component: AuthenticationComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', redirectTo: 'home' }, // TODO: Reset password functionality
    { path: 'profile/:userId', component: ProfileComponent },
    { path: 'tours/:tourId', component: TourDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
