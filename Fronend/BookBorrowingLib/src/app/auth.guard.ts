import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  /**
   * constructor(private login:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.login.isLoggedin() && this.login.getUserRole()=='ADMIN'){
      return true;
    }
    this.router.navigate(['login']);
    return false;
   */
    
  return true;
};
