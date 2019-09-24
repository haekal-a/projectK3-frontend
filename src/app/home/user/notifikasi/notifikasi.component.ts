import {Component, OnInit} from '@angular/core';
import {PersetujuanService} from '../../../service/persetujuan.service';
import {PinjamService} from '../../../service/pinjam.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.component.html',
  styleUrls: ['./notifikasi.component.css']
})
export class NotifikasiComponent implements OnInit {
  subs = new Subscription();
  jumlahKasusPersetujuan: number;

  constructor(private persetujuanService: PersetujuanService, private pinjamService: PinjamService) {
  }

  ngOnInit() {
    this.subs = this.pinjamService.successProcess.subscribe(
      success => {
        if (success === true) {
          this.initData();
        }
      }
    );

    this.initData();
  }

  initData() {
    this.persetujuanService.getDaftarPersetujuan().subscribe(
      success => {
        this.jumlahKasusPersetujuan = success.totalData;
      }
    );
  }

}
