import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { TourScheduleComponent } from './pages/tour-schedule/tour-schedule.component';
export const routes: Routes = [
    { path: 'home', component: MainPageComponent },
    { path: 'auth', component: AuthenticationComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', redirectTo: 'home' }, // TODO: Reset password functionality
    { path: 'profile/:userId', component: ProfileComponent },
    { path: 'tours/:tourId', component: TourDetailsComponent },
    { path: 'purchase/:userId/:tourId', component: PurchaseComponent},
    { path: 'favorites/:userId', component: FavoritesComponent},
    { path: 'tours/:id/schedule', component: TourScheduleComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
