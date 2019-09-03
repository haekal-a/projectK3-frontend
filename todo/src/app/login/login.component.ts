import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {BasicAuthService} from "../service/basic-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  invalidLogin = false;

  // ini digunakan untuk menambahkan Dependency Injection seperti autowired pada java spring
  // cukup masukan kelas komponen pada kontruktor
  constructor(private router: Router,
              private auth: AuthService,
              private basicAuth: BasicAuthService) {
  }

  ngOnInit() {

  }

  getUser() {
    if (this.auth.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  // basic auth -- tidak digunakan
  handleBasicAuthLogin() {
    this.basicAuth.executeAuthenticatin(this.username, this.password).subscribe(
      success => {
        // console.log(success);
        // window.alert(success.message);
        this.router.navigate(['welcome', this.username]);
      },
      error =>{
        console.log(error);
        window.alert("Bad Credential");
        this.invalidLogin = true;

      }
    )}

  handleJWTAuthLogin() {
    this.basicAuth.executeJWTAuth(this.username, this.password).subscribe(
      success => {
        // console.log(success);
        window.alert("Login successful");
        this.router.navigate(['welcome', this.username]);
      },
      error =>{
        console.log(error);
        window.alert("Bad Credential");
        this.invalidLogin = true;

      }
    )}
}
