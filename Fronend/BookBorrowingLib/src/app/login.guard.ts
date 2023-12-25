// import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedin()) {
      return true;
    } else {
      alert('Access denied');
      this.router.navigate(['login']);
      return false;
    }
  }
}
