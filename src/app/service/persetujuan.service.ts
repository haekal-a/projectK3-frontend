import {Injectable} from "@angular/core";
import {DummyService} from "./dummy/dummy.service";
import {HttpClient} from "@angular/common/http";
import {API_URL_PERSETUJUAN} from "../app.constant";
import {CommonResponseModel} from "../model/CommonResponseModel";
import {Subject} from "rxjs";
import {PeminjamanInputModel} from "../model/PeminjamanInputModel";
import {PersetujuanInputModel} from "../model/PersetujuanInputModel";

@Injectable()
export class PersetujuanService {
  successProcess = new Subject();

  constructor(private http: HttpClient) {

  }

  getDaftarPersetujuan() {
    return this.http.get<CommonResponseModel>(`${API_URL_PERSETUJUAN}/get`)
  }

  setuju(data: PersetujuanInputModel) {
    return this.http.post<CommonResponseModel>(`${API_URL_PERSETUJUAN}/setuju`, data)
  }

  tolak(data: PersetujuanInputModel){
    return this.http.post<CommonResponseModel>(`${API_URL_PERSETUJUAN}/tolak`, data)
  }

  getDaftarPinjam() {
    // return this.dummyService.getDaftarPinjam();
  }

}
