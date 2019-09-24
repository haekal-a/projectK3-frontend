import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {BasicAuthService} from "../../service/auth/basic-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  role: string = '';
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
      // this.router.navigate(['welcome', this.username]);
      this.router.navigate(['home']);
    } else {
      this.invalidLogin = true;
    }
  }

  handleJWTAuthLogin() {
    this.basicAuth.executeJWTAuth(this.username, this.password).subscribe(
      success => {
        window.alert("Login successful");
        this.username = this.basicAuth.getAuthenticatedUser();
        this.role = this.basicAuth.getRole();

        if (this.role === 'admin'){
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }

      },
      error =>{
        window.alert("Bad Credential");
        this.invalidLogin = true;

      }
    )}
}
