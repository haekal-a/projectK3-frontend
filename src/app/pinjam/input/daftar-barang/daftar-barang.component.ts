import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DaftarBarangModel} from '../../../model/DaftarBarang.model';
import {PinjamService} from '../../../service/pinjam.service';
import {MasterBmnOutputModel} from '../../../model/MasterBmnOutputModel';
import {error} from 'util';
import {ERROR} from '../../../app.constant';

@Component({
  selector: 'app-daftar-barang',
  templateUrl: './daftar-barang.component.html',
  styleUrls: ['./daftar-barang.component.css']
})
export class DaftarBarangComponent implements OnInit {
  showProgressTrue = true;
  daftarBarang: MasterBmnOutputModel[];
  displayedColumns: string[] = ['no', 'jenisBarang', 'namaBarang', 'merkBarang', 'keterangan', 'kondisi', 'aksi'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private pinjamService: PinjamService) {

  }

  ngOnInit() {
    this.pinjamService.successProcess.subscribe(
      response => {
        if (response === true) {
          this.initTablePeminjaman();
        }
      }
    );

    this.initTablePeminjaman();
  }

  initTablePeminjaman() {
    this.pinjamService.getDaftarBarangUntukDipinjam().subscribe(
      response => {
        this.daftarBarang = response.data;
        this.dataSource = new MatTableDataSource<MasterBmnOutputModel>(this.daftarBarang);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showProgressTrue = false;
      },
      error => {
        window.alert(`${ERROR}`);
        console.log(error);
        this.showProgressTrue = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pilihBarang(data: MasterBmnOutputModel) {
    this.pinjamService.barangDipinjam.next(data);
  }

}
