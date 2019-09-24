import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PinjamService} from '../../service/pinjam.service';
import {ConfirmBootboxComponent} from '../../util/confirm-bootbox/confirm-bootbox.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PeminjamanInputModel} from '../../model/PeminjamanInputModel';
import {BasicAuthService} from '../../service/auth/basic-auth.service';
import {MasterBmnOutputModel} from '../../model/MasterBmnOutputModel';
import {PeminjamanOutputModel} from '../../model/PeminjamanOutputModel';
import {UtilService} from '../../util/util.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-input-peminjaman',
  templateUrl: './input-peminjaman.component.html',
  styleUrls: ['./input-peminjaman.component.css'],
  animations: [
    trigger(
      // animasi dari awal
      'animate1', [
        transition('* => void', animate(300, style({
            opacity: 0,
            transform: 'translateX(200px)'
          }))
        ),
      ],
    )
  ]
})
export class InputPeminjamanComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  inputPeminjamanForm: FormGroup;
  idPeminjaman: number;
  editMode = false;

  constructor(private pinjamService: PinjamService,
              private dialog: MatDialog,
              private router: ActivatedRoute,
              private route: Router,
              private authService: BasicAuthService) {
  }

  ngOnInit() {
    this.initForm();

    // edit mode
    this.router.params.subscribe(
      (data: Params) => {
        this.idPeminjaman = data.id;
        this.pinjamService.getPeminjaman(this.idPeminjaman).subscribe(
          (response) => {
            this.editMode = true;
            const data: PeminjamanOutputModel = response.data;
            this.inputPeminjamanForm.patchValue({
              idBarang: data.idBarang,
              namaBarang: data.namaBarang,
              jenisBarang: data.jenisBarang,
              keterangan: data.keterangan,
              kondisi: UtilService.ubahFormatKondisi(data.kondisi), // dummy
              keperluan: data.keperluan,
              tanggalPinjam: new Date(data.tanggalPinjam),
              jatuhTempo: new Date(data.jatuhTempoPengembalian),

            });
          }, error => {
            console.log(error);
          }
        );
      }
    );

    // save mode
    this.subs = this.pinjamService.barangDipinjam.subscribe(
      (data: MasterBmnOutputModel) => {
        this.inputPeminjamanForm.patchValue({
          idBarang: data.id,
          namaBarang: data.namaBarang,
          jenisBarang: data.jenisBarang,
          keterangan: data.keterangan,
          kondisi: UtilService.ubahFormatKondisi(data.kondisi)
        });
      }
    );
  }

  private initForm() {
    this.inputPeminjamanForm = new FormGroup({
      idBarang: new FormControl(null, Validators.required), // needed for querying data
      namaBarang: new FormControl(null, Validators.required),
      jenisBarang: new FormControl(null, Validators.required),
      keterangan: new FormControl(null, Validators.required),
      kondisi: new FormControl(null, Validators.required),
      keperluan: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      tanggalPinjam: new FormControl(null, Validators.required),
      jatuhTempo: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const paramPeminjaman = new PeminjamanInputModel(
      this.idPeminjaman,
      this.inputPeminjamanForm.get('idBarang').value, // idbarang
      this.authService.getAuthenticatedUser(), // nip
      this.authService.getNama(), // namaPegawai
      this.inputPeminjamanForm.get('keperluan').value,
      this.inputPeminjamanForm.get('tanggalPinjam').value,
      this.inputPeminjamanForm.get('jatuhTempo').value
    );

    // setting case simpan atau edit
    let caseCode = '';
    let message = '';
    if (this.editMode) {
      caseCode = '3'; // edit
      message = 'Apakah kamu yakin akan mengubah permintaan barang ini?';
    } else {
      caseCode = '2'; // save
      message = 'Apakah kamu yakin akan mengajukan permintaan barang ini?';
    }

    const data = {
      case: caseCode,
      title: 'Permintaan Peminjaman Barang',
      message,
      peminjamanBarang: paramPeminjaman
    };

    const dialogRef = this.dialog.open(ConfirmBootboxComponent, {
      height: '100',
      width: '600px',
      data
    });

    this.pinjamService.successProcess.subscribe(
      response => {
        if (response === true) {
          this.onReset();
        }
      }
    );
  }

  onReset() {
    if (this.editMode) {
      const role = this.authService.getRole();
      this.route.navigate([`/${role}`]);
    } else {
      this.inputPeminjamanForm.markAllAsTouched();
      this.inputPeminjamanForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  myFilter = (d: Date): boolean => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate() - 7;

    const newDate = new Date(year, month, day);
    return d > newDate;
  }

  myFilter2 = (d: Date): boolean => {
    const date = this.inputPeminjamanForm.get('tanggalPinjam').value;
    return d > date;
  }

}
