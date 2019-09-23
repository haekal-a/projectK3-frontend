import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatKondisi'
})
export class KondisiPipe implements PipeTransform {
  transform(value: any): any {
    let kondisi: string = '';
    if (value === '0'){
      kondisi = 'Baik';
    } else if (value === '1') {
      kondisi = 'Rusak'
    } else {
      kondisi = 'Hilang'
    }
    return kondisi;
  }

}
