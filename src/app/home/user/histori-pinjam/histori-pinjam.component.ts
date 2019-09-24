import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../service/user.service";
import {MonitoringService} from "../../../service/monitoring.service";
import {PeminjamanOutputModel} from "../../../model/PeminjamanOutputModel";
import {ERROR} from "../../../app.constant";

@Component({
  selector: 'app-histori-pinjam',
  templateUrl: './histori-pinjam.component.html',
  styleUrls: ['./histori-pinjam.component.css']
})
export class HistoriPinjamComponent implements OnInit {

  showLoading = true;
  displayedColumns: string[] = [
    'no',
    'jenisBarang',
    'namaBarang',
    'merkBarang',
    'keterangan',
    'statusPeminjaman'];
  dataSource: MatTableDataSource<PeminjamanOutputModel>;
  dokumen: PeminjamanOutputModel[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private monitoringService: MonitoringService) {

  }

  ngOnInit() {
    this.monitoringService.getHistoriPeminjaman().subscribe(
      response => {
        this.dataSource = new MatTableDataSource<PeminjamanOutputModel>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.showLoading = false;

      }, error => {
        window.alert(ERROR);
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

