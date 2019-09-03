import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class HelloWorldDataService {

  constructor(private http: HttpClient) {
  }

  getHelloWorldClass() {
    return this.http.get<Model>("http://localhost:8080/hello-world-class")
  }

  getHelloWorldWithParam(name) {
    // kalau return bukan json, maka dikasih tambahan {responseType: 'text'} untuk parsing hasil menjaid text
    return this.http.get(`http://localhost:8080/hello-world/${name}`, {responseType: 'text'})
  }
}

export class Model {

  constructor(public message: string,
              public title: string) {

  }

}
