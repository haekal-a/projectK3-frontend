export class PeminjamanOutputModel {
  constructor(
    public  idPeminjaman: number,
    public  idBarang: number,
    public  nip: string,
    public  namaPeminjam: string,
    public  keperluan: string,
    public  tanggalPinjam: Date,
    public  tanggalKembali: Date,
    public  tanggalPersetujuan: Date,
    public  jatuhTempoPengembalian: Date,
    public  createdBy: string,
    public  approvedBy: string,
    public  createdDate: Date,
    public  statusPeminjaman: string,
    public  alasanPenolakan: string,
    public  jenisBarang: string,
    public  namaBarang: string,
    public  merkBarang: string,
    public  keterangan: string,
    public  kondisi: string,
  ) {
  }
}
