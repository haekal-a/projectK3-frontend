export class DaftarPeminjamanModel {
  constructor(
    public id: number,
    public idBarang: number,
    public jenisBarang: string,
    public namaBarang: string,
    public merkBarang: string,
    public keterangan: string,
    public namaPeminjam: string,
    public keperluan: string,
    public tanggalPinjam: Date,
    public jatuhTempo: Date,
    public status: string,
    public alasan: string
  ) {
  }
}
