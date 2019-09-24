import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogPencarianComponent} from './hasil-pencarian/dialog-pencarian/dialog-pencarian.component';

@Component({
  selector: 'app-monitorng',
  templateUrl: './monitorng.component.html',
  styleUrls: ['./monitorng.component.css']
})
export class MonitorngComponent implements OnInit {
  form: FormGroup;

  jenisBarang: any[] = [
    {value: 'A', viewValue: 'Mobil'},
    {value: 'B', viewValue: 'Motor'},
    {value: 'C', viewValue: 'Lain-lain'}
  ];

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      jenisBarang: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const data = {
      jenisBarang: this.form.get('jenisBarang').value
    };

    const dialogRef = this.dialog.open(DialogPencarianComponent, {
      height: '80%',
      width: '70%',
      data
    });
  }

}
