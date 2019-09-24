import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MonitoringService} from '../../../service/monitoring.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UtilService} from '../../../util/util.service';

@Component({
  selector: 'app-informasi-barang',
  templateUrl: './informasi-barang.component.html',
  styleUrls: ['./informasi-barang.component.css']
})
export class InformasiBarangComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subs = new Subscription();
  idBarang: number;

  constructor(private monitoringService: MonitoringService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    // this.monitoringService.idBarangYangDimonitor.next(this.idBarang);

    this.subs = this.monitoringService.barangYangDimonitor.subscribe(
      data => {
        this.form.setValue({
          jenisBarang: data.jenisBarang,
          namaBarang: data.namaBarang,
          merkBarang: data.merkBarang,
          keterangan: data.keterangan,
          kondisi: UtilService.ubahFormatKondisi(data.kondisiDbPenari),
          tahunPembelian: data.tahunPembelian
        });
      }
    );

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      jenisBarang: new FormControl(null),
      namaBarang: new FormControl(null),
      merkBarang: new FormControl(null),
      keterangan: new FormControl(null),
      kondisi: new FormControl(null),
      tahunPembelian: new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
