import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PeminjamanInputModel} from '../../model/PeminjamanInputModel';
import {PinjamService} from '../../service/pinjam.service';
import {Router} from '@angular/router';
import {BasicAuthService} from '../../service/auth/basic-auth.service';
import {ERROR} from '../../app.constant';
import {PersetujuanService} from '../../service/persetujuan.service';
import {PersetujuanInputModel} from '../../model/PersetujuanInputModel';

interface DialogData {
  // 1 -- case untuk persetujuan peminjaman
  // 2 -- case untuk simpan peminjaman
  // 3 -- case untuk update peminjaman
  // 4 -- case untuk hapus peminjaman
  id: number;
  case: string;
  title: string;
  message: string;
  peminjamanBarang: PeminjamanInputModel;

}

@Component({
  selector: 'app-confirm-bootbox',
  templateUrl: './confirm-bootbox.component.html',
  styleUrls: ['./confirm-bootbox.component.css']
})
export class ConfirmBootboxComponent implements OnInit {

  onProcess = false;
  alasanPenolakan: string;

  constructor(public dialogRef: MatDialogRef<ConfirmBootboxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private snackBar: MatSnackBar,
              private pinjamService: PinjamService,
              private persetujuanService: PersetujuanService,
              private route: Router,
              private authService: BasicAuthService) {
  }

  ngOnInit() {
  }

  onSave() {
    if (this.data.case === '1') { // persetujuan
      this.setujuPeminjaman();
    }

    if (this.data.case === '2') { // rekam permintaan
      this.simpanPeminjaman();
    }

    if (this.data.case === '3') { // rekam permintaan
      this.editPeminjaman();
    }

    if (this.data.case === '4') { // hapus permintaan
      this.hapusPeminjaman();
    }

  }

  setujuPeminjaman() {
    this.onProcess = true;

    const id = this.data.id;
    const nip = this.authService.getAuthenticatedUser();
    const data = new PersetujuanInputModel(id, null, nip);

    this.persetujuanService.setuju(data).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        const snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        this.persetujuanService.successProcess.next(true);
      }, error => {

        window.alert(error.error.message); // show error log
        console.log(error);
        this.dialogRef.close();
      }
    );
  }

  simpanPeminjaman() {
    this.onProcess = true;
    this.pinjamService.savePeminjaman(this.data.peminjamanBarang).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        const snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        this.pinjamService.successProcess.next(true);
      }, error => {
        window.alert(ERROR);
        console.log(error);
        this.dialogRef.close();
      }
    );
  }

  hapusPeminjaman() {
    const id = this.data.id;
    this.onProcess = true;
    this.pinjamService.hapusPeminjaman(id).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        const snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        this.pinjamService.successProcess.next(true);
      }, error => {
        window.alert(ERROR);
        console.log(error);
        this.dialogRef.close();
      }
    );
  }

  editPeminjaman() {
    this.onProcess = true;
    this.pinjamService.editPeminjaman(this.data.peminjamanBarang).subscribe(
      response => {
        this.onProcess = false;
        this.dialogRef.close();

        const snackBarRef = this.snackBar.open(response.message, 'Tutup', {
          duration: 3000
        });

        const role = this.authService.getRole();
        this.route.navigate([`/${role}`]);
      }
    );
  }
}
