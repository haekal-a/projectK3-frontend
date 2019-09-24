import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from '../../../service/user.service';
import {PinjamService} from '../../../service/pinjam.service';
import {Router} from '@angular/router';
import {ConfirmBootboxComponent} from '../../../util/confirm-bootbox/confirm-bootbox.component';
import {MatDialog} from '@angular/material/dialog';
import {BasicAuthService} from '../../../service/auth/basic-auth.service';
import {ERROR} from '../../../app.constant';
import {PeminjamanOutputModel} from '../../../model/PeminjamanOutputModel';
import {UtilService} from '../../../util/util.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-konfirmasi',
  templateUrl: './konfirmasi.component.html',
  styleUrls: ['./konfirmasi.component.css']
})
export class KonfirmasiComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  noRecords = false;
  showProgress = true;
  displayedColumns: string[] = ['no', 'jenisBarang', 'namaBarang',
    'keterangan', 'keperluan', 'tanggalPinjam', 'jatuhTempoPengembalian', 'aksi'];
  dataSource: MatTableDataSource<PeminjamanOutputModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private route: Router,
              private dialog: MatDialog,
              private authService: BasicAuthService,
              private pinjamService: PinjamService) {

  }

  ngOnInit() {
    this.subs = this.pinjamService.successProcess.subscribe(
      (response: boolean) => {
        if (response === true) {
          console.log('harusnya init');
          this.initTable();
        }
      }
    );

    this.initTable();

  }

  initTable() {
    this.pinjamService.getDaftarKonfirmasi().subscribe(
      response => {
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.showProgress = false;

        if (response.data == null) {
          this.noRecords = true;
        }
      },
      error => {
        window.alert(ERROR);
        console.log(error);
        this.showProgress = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPeminjaman(data: PeminjamanOutputModel) {
    this.route.navigate(['/pinjam/edit', data.idPeminjaman]);
  }

  hapusPeminjaman(data: PeminjamanOutputModel) {
    const param = {
      case: '4', // case untuk persetujuan
      id: data.idPeminjaman,
      title: 'Permintaan Peminjaman Barang',
      message: 'Apakah kamu yakin akan menghapus permintaan peminjaman barang ini?'
    };

    const dialogRef = this.dialog.open(ConfirmBootboxComponent, {
      height: '100',
      width: '600px',
      data: param
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
