import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PengembalianInputModel} from "../../model/PengembalianInputModel";
import {PengembalianService} from "../../service/pengembalian.service";
import {ERROR} from "../../app.constant";

@Component({
  selector: 'app-tanggal-terima-dialog',
  templateUrl: './tanggal-terima-dialog.component.html',
  styleUrls: ['./tanggal-terima-dialog.component.css']
})
export class TanggalTerimaDialogComponent implements OnInit {
  onProcess = false;

  jenisKondisi = [
    {value: "0", viewValue: "Baik"},
    {value: "1", viewValue: "Rusak"},
    {value: "2", viewValue: "Hilang"},
  ];

  formTanggalKembali: FormGroup;

  constructor(public dialogRef: MatDialogRef<TanggalTerimaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private pengembalianService: PengembalianService) {
  }

  ngOnInit() {
    this.formTanggalKembali = new FormGroup({
      'tanggalKembali': new FormControl(null, Validators.required),
      'kondisi': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.onProcess = true;

    const id = this.data.id; // id untuk dikirim ke server
    const tanggalKembali = this.formTanggalKembali.get('tanggalKembali').value;
    const kondisi = this.formTanggalKembali.get('kondisi').value;
    const data = new PengembalianInputModel(id, tanggalKembali, kondisi);

    this.pengembalianService.simpanPengembalian(data).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        let snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        this.pengembalianService.successProcess.next(true);

      }, error => {
        this.onProcess = false;
        this.dialogRef.close();

        window.alert(ERROR);
        console.log(error)
      }
    );
  }

}
