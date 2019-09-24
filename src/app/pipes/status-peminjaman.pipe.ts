import { Pipe, PipeTransform } from '@angular/core';
import has = Reflect.has;
import {UtilService} from "../util/util.service";
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'statusPeminjaman'
})
export class StatusPeminjamanPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value: any, alasanPenolakan: string, tanggalPengembalian: Date): any {
    let hasil = "";
   switch (value) {
     case "0":
       hasil = "Menunggu konfirmasi";
       break;
     case "1":
       hasil = "Sedang dipinjam";
       break;
     case "2":
       hasil = "Ditolak karena " + alasanPenolakan;
       break;
     case "3":
       hasil = "Sudah dikembalikan tanggal " + this.datePipe.transform(new Date(), 'dd/MM/yyyy');
       break;
   }
    return hasil;
  }

}
