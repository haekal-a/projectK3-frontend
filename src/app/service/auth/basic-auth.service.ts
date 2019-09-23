import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Subject} from "rxjs";
import {API_URL} from "../../app.constant";

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';
export const ROLE = 'role';
export const NAMA_PEGAWAI = 'namaPegawai';
export const UNIT_PEGAWAI = 'unitPegawai';

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
          const userDetails = data.userDetails;
          const authorities = userDetails.authorities;
          const dataPegawai = userDetails.pegawai;
          console.log(dataPegawai);
          const unit = dataPegawai.jabatan + " " + dataPegawai.seksi;

          sessionStorage.setItem(AUTHENTICATED_USER, userDetails.username);
          sessionStorage.setItem(ROLE, authorities[0].authority);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          sessionStorage.setItem(NAMA_PEGAWAI, dataPegawai.namaPegawai);
          sessionStorage.setItem(UNIT_PEGAWAI, unit);

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

    return this.http.get<any>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        data => {
          //simpan username dan token
          const userDetail = data.userDetail;
          console.log(userDetail);
          sessionStorage.setItem(AUTHENTICATED_USER, userDetail.username);
          sessionStorage.setItem(ROLE, userDetail.role);
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

  getRole(){
    return sessionStorage.getItem(ROLE);
  }

  getNama(){
    return sessionStorage.getItem(NAMA_PEGAWAI);
  }

  getUnit(){
    return sessionStorage.getItem(UNIT_PEGAWAI);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(ROLE);
    sessionStorage.removeItem(NAMA_PEGAWAI);
    sessionStorage.removeItem(UNIT_PEGAWAI);
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
