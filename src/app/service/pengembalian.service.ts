import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_PENGEMBALIAN} from "../app.constant";
import {CommonResponseModel} from "../model/CommonResponseModel";
import {PengembalianInputModel} from "../model/PengembalianInputModel";
import {Subject} from "rxjs";

@Injectable()
export class PengembalianService {
  successProcess = new Subject();
  constructor(private http: HttpClient){}

  getDaftarPengembalian(){
    return this.http.get<CommonResponseModel>(`${API_URL_PENGEMBALIAN}/get`)
  }

  simpanPengembalian(data: PengembalianInputModel){
    return this.http.post<CommonResponseModel>(`${API_URL_PENGEMBALIAN}/save`, data);
  }

}
