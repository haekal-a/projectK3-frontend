import {DaftarPeminjamanModel} from "../../model/DaftarPeminjaman.model";
import {DaftarPersetujuanPeminjamanModel} from "../../model/DaftarPersetujuanPeminjaman.model";
import {DaftarPengembalianPeminjamanModel} from "../../model/DaftarPengembalianPeminjaman.model";
import {DaftarBarangModel} from "../../model/DaftarBarang.model";

// dummy database
export class DummyService {
  daftarPinjam: DaftarPeminjamanModel[] = [
    {id: 1, idBarang: 101, jenisBarang: "Motor", namaBarang: "Vario 125", merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Reza Pahlevie", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Sedang Dipinjam", alasan:""},
    {id: 2, idBarang: 102, jenisBarang: "Motor", namaBarang: "Revo 125",  merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Reza Pahlevie", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Sedang Dipinjam", alasan:""},
    {id: 3, idBarang: 103, jenisBarang: "Mobil", namaBarang: "Avanza 2019",  merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Haekal", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Selesai", alasan:""},
    {id: 4, idBarang: 104, jenisBarang: "Mobil", namaBarang: "Rush",  merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Galang", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Selesai", alasan:""},
    {id: 5, idBarang: 105, jenisBarang: "Lain-lain", namaBarang: "Kamera Nikon 2000",  merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Yusuf", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Ditolak", alasan:"Barang sudah dipinjam"},
    {id: 6, idBarang: 106, jenisBarang: "Lain-lain", namaBarang: "DGI Drone",  merkBarang: "Honda", keterangan: "ABC", namaPeminjam: "Yastiadi Enggar", keperluan: "ST", tanggalPinjam: new Date(), jatuhTempo: new Date(), status:"Ditolak", alasan:"Rusak"},
  ];

  daftarPersetujuan: DaftarPersetujuanPeminjamanModel[] = [
    {id: 7, idBarang: 107, jenisBarang: "Motor", namaBarang: "RX King", namaPeminjam: "Windy", tanggalPinjam: new Date(), jatuhTempo: new Date(), keperluan:"Tugas Ke Barat"},
    {id: 8, idBarang: 108, jenisBarang: "Mobil", namaBarang: "Xenia", namaPeminjam: "Galang", tanggalPinjam: new Date(), jatuhTempo: new Date(),  keperluan:"Tugas Ke Utara"},
    {id: 9, idBarang: 109, jenisBarang: "Kamera", namaBarang: "Sony Alfa 2000", namaPeminjam: "Reza Pahlevie", tanggalPinjam: new Date(), jatuhTempo: new Date(),  keperluan:"Dokumentasi Penutupan Riau Fest"},
  ];

  daftarBarang: DaftarBarangModel[] = [
    {idBarang: 110, jenisBarang: "Motor", namaBarang: "ADV 150", merkBarang: "Honda", keterangan: 'B 2232 UXC'},
    {idBarang: 111, jenisBarang: "Mobil", namaBarang: "Xpander", merkBarang: "Mitubishi", keterangan: 'B 666 STN'},
    {idBarang: 112, jenisBarang: "Lain-lain", namaBarang: "EOS 112", merkBarang: "Cannon", keterangan: '112.23BB3'},
  ];

  daftarPengembalian: DaftarPengembalianPeminjamanModel[] = [
    {id: 10, idBarang: 110, jenisBarang: "Lain-lain", namaBarang: "Ricoh 1123", namaPeminjam: "Reza Pahlevie", jatuhTempo: new Date()},
    {id: 11, idBarang: 111, jenisBarang: "Motor", namaBarang: "Beat 2012", namaPeminjam: "Windy", jatuhTempo: new Date()},
  ];

  getDaftarPinjam(){
    return this.daftarPinjam;
  }

  getCountDaftarPersetujuan(){
    return this.daftarPersetujuan.length;
  }

  getDaftarPersetujuan(){
    return this.daftarPersetujuan;
  }

  getDaftarPegembalian(){
    return this.daftarPengembalian;
  }

  getDaftarBarang(){
    return this.daftarBarang
  }

  getPeminjaman(id: number) : DaftarPeminjamanModel{
    return this.daftarPinjam.find(x => x.id === id);
  }

}
