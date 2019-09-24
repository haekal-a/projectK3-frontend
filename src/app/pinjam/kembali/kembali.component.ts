import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TanggalTerimaDialogComponent} from '../../util/tanggal-terima-dialog/tanggal-terima-dialog.component';
import {DaftarPengembalianPeminjamanModel} from '../../model/DaftarPengembalianPeminjaman.model';
import {PinjamService} from '../../service/pinjam.service';
import {PengembalianService} from '../../service/pengembalian.service';
import {PeminjamanOutputModel} from '../../model/PeminjamanOutputModel';

@Component({
  selector: 'app-kembali',
  templateUrl: './kembali.component.html',
  styleUrls: ['./kembali.component.css']
})
export class KembaliComponent implements OnInit {
  dataSource;
  daftarPengembalian: PeminjamanOutputModel[] = [];
  displayedColumns: string[] = ['no', 'jenisBarang',
    'namaBarang', 'namaPeminjam', 'jatuhTempoPengembalian', 'aksi'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,
              private pinjamService: PinjamService,
              private pengembalianService: PengembalianService) {
  }

  ngOnInit() {
    this.pengembalianService.successProcess.subscribe(
      response => {
        if (response === true) {
          this.initTable();
        }
      }
    );
    this.initTable();

  }

  initTable() {
    this.pengembalianService.getDaftarPengembalian().subscribe(
      response => {
        this.daftarPengembalian = response.data;
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(this.daftarPengembalian);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  inputTanggal(id: number) {
    let dialogRef = this.dialog.open(TanggalTerimaDialogComponent, {
      height: '100',
      width: '600px',
      data: {id: id}
    },);
  }

}
