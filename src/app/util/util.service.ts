export class UtilService {
   static ubahFormatKondisi(kode: string) {
    let kondisi = "";
    if (kode === '0') {
      kondisi = 'Baik';
    } else if (kode === '1') {
      kondisi = 'Rusak'
    } else {
      kondisi = 'Hilang'
    }
    return kondisi;
  }

  static periksaTanggal(tanggal: Date){
    if (tanggal > new Date()) {
      return true;
    }
  }
}
