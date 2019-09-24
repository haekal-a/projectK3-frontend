import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL_MONITORING} from '../app.constant';
import {CommonResponseModel} from '../model/CommonResponseModel';
import {BasicAuthService} from './auth/basic-auth.service';
import {Subject} from 'rxjs';
import {BarangOutputModel} from '../model/BarangOutputModel';

@Injectable()
export class MonitoringService {
  barangYangDimonitor = new Subject<BarangOutputModel>();
  idBarangYangDimonitor = new Subject<number>();
  constructor(private http: HttpClient,
              private authService: BasicAuthService) {
  }

  getDaftarBarangSedangDipinjamAdmin() {
    return this.http.get<CommonResponseModel>(`${API_URL_MONITORING}/pinjam/get`);
  }

  getDaftarBarangSedangDipinjamUser() {
    const nip = this.authService.getAuthenticatedUser();
    return this.http.get<CommonResponseModel>(`${API_URL_MONITORING}/pinjam/get/${nip}`);
  }

  getHistoriPeminjaman() {
    const nip = this.authService.getAuthenticatedUser();
    return this.http.get<CommonResponseModel>(`${API_URL_MONITORING}/pinjam/history/get/${nip}`);
  }

  getDaftarBarangByKdBarang(kdBarang: string) {
    return this.http.get<CommonResponseModel>(`${API_URL_MONITORING}/barang/get/${kdBarang}`);
  }

  getHistoriBarang(idBarang: number) {
    return this.http.get<CommonResponseModel>(`${API_URL_MONITORING}/barang/history/get/${idBarang}`);
  }

}
