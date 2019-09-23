export class DaftarPersetujuanPeminjamanModel {
  constructor(
    public id: number,
    public idBarang: number,
    public jenisBarang: string,
    public namaBarang: string,
    public namaPeminjam: string,
    public tanggalPinjam: Date,
    public jatuhTempo: Date,
    public keperluan: string
  ) {
  }
}
