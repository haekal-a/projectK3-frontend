import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constant";
import {Injectable} from "@angular/core";
import {CommonResponseModel} from "../../model/CommonResponseModel";

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {

  }

  cekNip(nip: string) {
    return this.http.get<CommonResponseModel>(`${API_URL}/pegawai/get/${nip}`)
  }

  register(data: any){
    return this.http.post<CommonResponseModel>(`${API_URL}/register`, data)
  }
}
