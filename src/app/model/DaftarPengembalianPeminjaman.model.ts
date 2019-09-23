export class DaftarPengembalianPeminjamanModel{
  constructor(
    public id: number,
    public idBarang: number,
    public jenisBarang: string,
    public namaBarang: string,
    public namaPeminjam: string,
    public jatuhTempo: Date,
  ) {
  }
}
