import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PinjamService} from '../../service/pinjam.service';
import {MatDialog} from '@angular/material/dialog';
import {RejectDialogComponent} from '../../util/reject-dialog/reject-dialog.component';
import {ConfirmBootboxComponent} from '../../util/confirm-bootbox/confirm-bootbox.component';
import {PersetujuanService} from '../../service/persetujuan.service';
import {PeminjamanOutputModel} from '../../model/PeminjamanOutputModel';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-persetujuan',
  templateUrl: './persetujuan.component.html',
  styleUrls: ['./persetujuan.component.css']
})
export class PersetujuanComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  showLoad = true;
  dataSource;
  displayedColumns: string[] = ['no', 'jenisBarang',
    'namaBarang', 'namaPeminjam', 'tanggalPinjam', 'jatuhTempoPengembalian', 'keperluan', 'aksi'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private pinjamService: PinjamService,
              private persetujuanService: PersetujuanService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subs = this.persetujuanService.successProcess.subscribe(
      response => {
        if (response === true) {
          this.initTable();
        }
      }
    );

    this.initTable();
  }

  initTable() {
    this.persetujuanService.getDaftarPersetujuan().subscribe(
      (response) => {
        const data: PeminjamanOutputModel[] = response.data;
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.showLoad = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setuju(id: number) {
    let data = {
      case: '1', // case untuk persetujuan
      id: id,
      title: 'Persetujuan Peminjaman Barang',
      message: 'Apakah kamu yakin akan menyetujui permintaan barang ini?'
    };

    let dialogRef = this.dialog.open(ConfirmBootboxComponent, {
      height: '100',
      width: '600px',
      data: data
    });
  }

  tolak(id: number) {
    let data = {
      id: id,
      title: 'Penolakan Peminjaman Barang',
      message: 'Isi alasan penolakan terlebih dahulu apabila kamu yakin akan menolak permintaan barang ini'
    };

    let dialogRef = this.dialog.open(RejectDialogComponent, {
      height: '100',
      width: '600px',
      data: data
    },);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
