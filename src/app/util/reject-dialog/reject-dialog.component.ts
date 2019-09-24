import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PeminjamanInputModel} from "../../model/PeminjamanInputModel";
import {PersetujuanInputModel} from "../../model/PersetujuanInputModel";
import {PersetujuanService} from "../../service/persetujuan.service";
import {ERROR} from "../../app.constant";

interface DialogData {
  id: number;
  title: string;
  message: string;
}

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit {
  onProcess = false;
  formTolak: FormGroup;

  constructor(public dialogRef: MatDialogRef<RejectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private snackBar: MatSnackBar,
              private persetujuanService: PersetujuanService) {
  }

  ngOnInit() {
    this.formTolak = new FormGroup({
      'alasanPenolakan': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.onProcess = true;

    const id = this.data.id; // id untuk dikirim ke server
    const alasanPenolakan = this.formTolak.get('alasanPenolakan').value;
    const data = new PersetujuanInputModel(id, alasanPenolakan, null);

    this.persetujuanService.tolak(data).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        let snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        this.persetujuanService.successProcess.next(true)
      }, error => {
        window.alert(ERROR);
        console.log(error);
        this.dialogRef.close();
      }
    );
  }

}
