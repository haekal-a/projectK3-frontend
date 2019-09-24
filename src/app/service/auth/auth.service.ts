import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  authenticate(user, password) {
    if (user === "Lepi" && password === "123") {
      // session storage adalah fitur pada browser yang dapat digunakan untuk menyimpan atribut,
      //selama browser tidak ditutup. dapat digunakan untuk menyimpan session user
      sessionStorage.setItem('authenticaterUser', user);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

  isLogedIn() {
    let user = sessionStorage.getItem('authenticaterUser');
    return user !== null;
  }
}
