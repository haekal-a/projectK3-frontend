import {DummyService} from "./dummy/dummy.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class UserService {
  constructor(private dummyService: DummyService){

  }

  getDaftarPinjam(){
    return this.dummyService.getDaftarPinjam();
  }

}
