import {DummyService} from './dummy/dummy.service';
import {Injectable} from '@angular/core';
import {DaftarPengembalianPeminjamanModel} from '../model/DaftarPengembalianPeminjaman.model';
import {Subject} from 'rxjs';
import {API_URL_BARANG, API_URL_PINJAM, ERROR} from '../app.constant';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../model/CommonResponseModel';
import {MasterBmnOutputModel} from '../model/MasterBmnOutputModel';
import {PeminjamanInputModel} from '../model/PeminjamanInputModel';
import {PeminjamanOutputModel} from '../model/PeminjamanOutputModel';
import {AuthService} from './auth/auth.service';
import {BasicAuthService} from './auth/basic-auth.service';

@Injectable()
export class PinjamService {
  barangDipinjam = new Subject<MasterBmnOutputModel>();
  successProcess = new Subject<boolean>();

  constructor(private dummyServcie: DummyService,
              private http: HttpClient,
              private authService: BasicAuthService) {
  }

  getDaftarKonfirmasi() {
    const user = this.authService.getAuthenticatedUser();
    return this.http.get<CommonResponseModel>(`${API_URL_PINJAM}/get/daftarkonfirmasi/${user}`);
  }

  getDaftarPengembalian(): DaftarPengembalianPeminjamanModel[] {
    return this.dummyServcie.getDaftarPegembalian();
  }

  getDaftarBarangUntukDipinjam() {
    return this.http.get<CommonResponseModel>(`${API_URL_BARANG}/get`);
  }

  getPeminjaman(id: number) {
    return this.http.get<CommonResponseModel>(`${API_URL_PINJAM}/get/${id}`);
  }

  savePeminjaman(peminjaman: PeminjamanInputModel) {
    return this.http.post<CommonResponseModel>(`${API_URL_PINJAM}/save`, peminjaman);
  }

  editPeminjaman(peminjaman: PeminjamanInputModel) {
    return this.http.post<CommonResponseModel>(`${API_URL_PINJAM}/edit`, peminjaman);
  }

  hapusPeminjaman(id: number) {
    return this.http.delete<CommonResponseModel>(`${API_URL_PINJAM}/delete/${id}`);
  }


}
