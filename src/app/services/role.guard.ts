import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        // Revisamos si el usuario tiene el rol de administrador para interactuar con la base de datos
        if(this.authService.isAuthenticated()) {
            let user: any = localStorage.getItem('user');
            if (user) user = JSON.parse(user);
            if(String(user.user.role).toLowerCase() != 'admin') {
                this.router.navigateByUrl('/entries/course-entries');
                return false;
            }
            return true;
        }
        this.router.navigateByUrl('/entries/course-entries');
        return false;
    }
}