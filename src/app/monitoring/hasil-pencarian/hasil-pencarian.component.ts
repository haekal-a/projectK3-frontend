import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-hasil-pencarian',
  templateUrl: './hasil-pencarian.component.html',
  styleUrls: ['./hasil-pencarian.component.css']
})
export class HasilPencarianComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router.snapshot.params.id);
  }

}
