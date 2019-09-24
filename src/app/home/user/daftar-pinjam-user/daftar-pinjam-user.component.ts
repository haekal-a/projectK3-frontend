import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DaftarPeminjamanModel} from '../../../model/DaftarPeminjaman.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from '../../../service/user.service';
import {PeminjamanOutputModel} from '../../../model/PeminjamanOutputModel';
import {MonitoringService} from '../../../service/monitoring.service';
import {ERROR} from '../../../app.constant';
import {UtilService} from '../../../util/util.service';

@Component({
  selector: 'app-daftar-pinjam-user',
  templateUrl: './daftar-pinjam-user.component.html',
  styleUrls: ['./daftar-pinjam-user.component.css']
})
export class DaftarPinjamUserComponent implements OnInit {
  showLoading = true;
  daftarDokumen: PeminjamanOutputModel[] = [];
  displayedColumns: string[] = ['no', 'jenisBarang', 'namaBarang', 'merkBarang', 'keterangan', 'keperluan', 'tanggalPinjam', 'jatuhTempoPengembalian'];
  dataSource: MatTableDataSource<PeminjamanOutputModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private monitoringService: MonitoringService) {

  }

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    this.monitoringService.getDaftarBarangSedangDipinjamUser().subscribe(
      response => {
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(response.data);
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
