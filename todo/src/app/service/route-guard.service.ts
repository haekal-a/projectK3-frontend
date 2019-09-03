import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

// digunakan untuk memberikan security pada halaman yang tidak boleh diakses sebelum user login
export class RouteGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private  router: Router) {}


  //override dari kelas CanActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLogedIn()) {
      return true;
    }

    // jika user belum login, maka akan diredirect ke halaman login dulu
    this.router.navigate(['']);
    return false;
  }
}
