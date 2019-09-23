export class PengembalianInputModel {
  constructor(
    public idPeminjaman: number,
    public tanggalKembali: Date,
    public kondisi: string) {
  }

}
