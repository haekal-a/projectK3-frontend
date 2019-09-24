import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {BasicAuthService} from "../../service/auth/basic-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role: string;
  user: string;
  nama: String;
  unit: String;

  constructor(private basicAuth: BasicAuthService,
              private route: Router) {
  }

  ngOnInit() {
  }

  cekUser() {
    const userLoged = this.basicAuth.getAuthenticatedUser();
    const userRole = this.basicAuth.getRole();
    const nama = this.basicAuth.getNama();
    const unit = this.basicAuth.getUnit();

    if (userLoged !== null) {
      this.user = userLoged;
      this.role = userRole;
      this.nama = nama;
      this.unit = unit
      return true;
    }
  }

  cekSession() {
    if (this.basicAuth.isLogedIn()) {
      return true;
    } else {
      return false
    }
  }

  redirectToHome() {
    this.role = this.basicAuth.getRole();
    if (this.role === 'admin') {
      this.route.navigate(['/admin']);
    } else {
      this.route.navigate(['/user']);
    }
  }

}
