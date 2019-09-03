// ini adalah syntax untuk mengimport module lain
import {Input, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelloWorldDataService} from "../service/data/hello-world-data.service";
import {Alert} from "selenium-webdriver";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
// export class == public pada java, agar class ini bisa diakses oleh module lain
export class WelcomeComponent implements OnInit {

  // inisiasi sebuah variabel baru dengan nama variabel message
  // tipe data string
  // value = 'Halo Dunia'
  name = '';
  data = '';
  errorMessage = '';
  user = '';
  close = false;

  //ActivatedRoute adalah komponen yg digunakan untuk menerima paramter dari komponen lain melalui redirect
  constructor(private router: ActivatedRoute,
              private helloWorldService: HelloWorldDataService) {
  }

  ngOnInit() {
    this.name = this.router.snapshot.params['username'];
    this.getResponseParam(this.name);
  }

  getHelloWorldClass() {
    //subscribe digunakan untuk mengaktifkan asyncrhronus
    this.helloWorldService.getHelloWorldClass().subscribe(
      response => this.data = response.message,
      error => this.error(error)
    );
  }

  getResponseParam(name) {
    this.helloWorldService.getHelloWorldWithParam(name).subscribe(
      response => this.user = response,
      error => this.error(error)
    )
  }

  error(error) {
    return this.errorMessage = "Oops, you got this error:" + error.name + " caused by " + error.message + ". Please contact service!"
  }

}
