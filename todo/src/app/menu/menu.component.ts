import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  cekSession() {
    if (this.auth.isLogedIn()) {
      return true;
    } else {
      return false
    }
  }
}
