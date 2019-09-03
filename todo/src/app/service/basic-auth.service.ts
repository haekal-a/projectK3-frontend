import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {API_URL} from "../app.constant";

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})

export class BasicAuthService {

  constructor(private http: HttpClient) {
  }

  executeJWTAuth(username, password) {
    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        data => {
          //simpan username dan token
          console.log(data);
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    )
  }

  //basic auth, tidak dipakai
  executeAuthenticatin(username, password) {
    let basicHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicHeaderString
    });

    return this.http.get<AuthModel>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        data => {
          //simpan username dan token
          console.log(data);
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicHeaderString);
          return data;
        }
      )
    )
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  isLogedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return user !== null;
  }
}

export class AuthModel {
  constructor(public message: string, public title: string) {
  }
}
