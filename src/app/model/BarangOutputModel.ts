export class BarangOutputModel {
  constructor(
    public  id: number,
    public  kdBarang: string,
    public  namaBarang: string,
    public  merkBarang: string,
    public  tahunPembelian: string,
    public  keterangan: string,
    public  kondisi: string,
    public  createdBy: string,
    public  createdDate: Date,
    public  stsBarang: string,
    public  kondisiDbPenari: string,
    public  jenisBarang: string,
    public  keteranganDbPenari: string,
  ) {
  }
}
