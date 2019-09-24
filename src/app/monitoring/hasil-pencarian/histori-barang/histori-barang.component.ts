import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DaftarPeminjamanModel} from "../../../model/DaftarPeminjaman.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PersetujuanService} from "../../../service/persetujuan.service";
import {MonitoringService} from '../../../service/monitoring.service';
import {Subscription} from 'rxjs';
import {PeminjamanOutputModel} from '../../../model/PeminjamanOutputModel';

@Component({
  selector: 'app-histori-barang',
  templateUrl: './histori-barang.component.html',
  styleUrls: ['./histori-barang.component.css']
})
export class HistoriBarangComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  displayedColumns: string[] = ['no', 'namaPeminjam', 'keperluan', 'tanggalPinjam', 'jatuhTempoPengembalian', 'statusPeminjaman'];
  dataSource; // data yang akan ditampilkan

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private monitoringService: MonitoringService) {
  }

  ngOnInit() {
    this.subs = this.monitoringService.idBarangYangDimonitor.subscribe(
      id => {
        console.log(id);
        this.monitoringService.getHistoriBarang(id).subscribe(
          response => {
            this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        );
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
