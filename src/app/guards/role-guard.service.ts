import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let requiredRoles: string[] = route.data['roles'];

    for (let requiredRole of requiredRoles) {
      if (this.authService.hasRole(requiredRole)) {
        return true;
      }
    }

    this.router.navigate(['/access-denied']);
    return false;
  }
}
