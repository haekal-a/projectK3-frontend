import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DaftarBarangModel} from '../../../model/DaftarBarang.model';
import {PinjamService} from '../../../service/pinjam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MonitoringService} from '../../../service/monitoring.service';
import {ERROR} from '../../../app.constant';
import {MatTableDataSource} from '@angular/material';
import {BarangOutputModel} from '../../../model/BarangOutputModel';

@Component({
  selector: 'app-dialog-pencarian',
  templateUrl: './dialog-pencarian.component.html',
  styleUrls: ['./dialog-pencarian.component.css']
})
export class DialogPencarianComponent implements OnInit {
  showLoading = true;
  daftarBarang: BarangOutputModel[];
  displayedColumns: string[] = ['no', 'namaBarang', 'merkBarang', 'keterangan', 'aksi'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<DialogPencarianComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private pinjamService: PinjamService,
              private router: Router,
              private monitoringService: MonitoringService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    this.monitoringService.getDaftarBarangByKdBarang(this.data.jenisBarang).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<BarangOutputModel>(response.data);
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

  pilihBarang(data: BarangOutputModel) {
    // this.router.navigate(['monitoring', data.id]);
    this.monitoringService.barangYangDimonitor.next(data);
    this.monitoringService.idBarangYangDimonitor.next(data.id);
  }

}

interface DialogData {
  jenisBarang: string;
}
