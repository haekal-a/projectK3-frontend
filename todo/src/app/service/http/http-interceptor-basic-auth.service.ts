import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasicAuthService} from "../basic-auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuth: BasicAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*let username = 'Lepi';
     let password = '123';
     // string header, dan username dan password harus di convert menjadi base 64
     let basicAuth = 'Basic ' + window.btoa(username + ':'  + password);*/

    let username = this.basicAuth.getAuthenticatedUser();
    let token = this.basicAuth.getToken();

    if (username && token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
