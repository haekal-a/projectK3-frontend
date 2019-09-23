export class PeminjamanInputModel{

  constructor(
    public idPeminjaman: number,
    public idBarang: number,
    public nip: string,
    public namaPeminjam: string,
    public keperluan: string,
    public tanggalpinjam: Date,
    public tanggaljatuhtempo: Date,
  ){

  }
}
