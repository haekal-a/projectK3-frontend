import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PeminjamanOutputModel} from '../../../model/PeminjamanOutputModel';
import {MonitoringService} from '../../../service/monitoring.service';
import {ERROR} from '../../../app.constant';
import {UtilService} from '../../../util/util.service';

@Component({
  selector: 'app-daftar-pinjam-admin',
  templateUrl: './daftar-pinjam-admin.component.html',
  styleUrls: ['./daftar-pinjam-admin.component.css']
})
export class DaftarPinjamAdminComponent implements OnInit {
  showLoading = true;
  daftarPinjam: PeminjamanOutputModel[];
  displayedColumns: string[] = ['no', 'jenisBarang', 'namaBarang', 'namaPeminjam', 'tanggalPinjam', 'jatuhTempoPengembalian'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private monitoringService: MonitoringService) {

  }

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    this.monitoringService.getDaftarBarangSedangDipinjamAdmin().subscribe(
      response => {
        this.daftarPinjam = response.data;
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(this.daftarPinjam);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.showLoading = false;
      }, error => {
        window.alert(ERROR);
        console.log(error);

        this.showLoading = false;
      }
    );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cekTanggal(stringTanggal: string) {
    const tanggal = new Date(stringTanggal);
    return UtilService.periksaTanggal(tanggal);
  }

}
