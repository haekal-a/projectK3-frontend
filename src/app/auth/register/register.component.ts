import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterValidation} from "./register.validation";
import {RegisterService} from "../../service/auth/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private registerService: RegisterService) {
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = new FormGroup({
      'user': new FormControl(null, Validators.required),
      'namaUser': new FormControl(null),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', [Validators.required])
    }, {validators: RegisterValidation.checkPasswords})
  }


  onSubmit() {
    let param = {
      username: this.form.get('user').value,
      password: this.form.get('password').value,
    };
    return this.registerService.register(param).subscribe(
      (response) => {
       if (response.code === "1"){
         window.alert("Proses Registrasi Berhasil, silahkan login untuk mulai menggunkan aplikasi");
         this.form.reset();
       } else {
         window.alert(response.message);
         this.form.controls['user'].setErrors({'invalid': true});
       }
      },
      (error) => {
        window.alert("Terjadi kesalahan dalam pemrosesan data, silahkan hubungi admin");
        console.log(error)
      }
    );
  }

  cekNip() {
    const nip = this.form.get('user').value;
    this.registerService.cekNip(nip).subscribe(
      (response) => {
        window.alert(response.message);
        if (response.code === "1") {
          this.form.get('namaUser').setValue(response.data.namaPegawai);
          this.form.controls['user'].setErrors(null);
        } else {
          this.form.controls['user'].setErrors({'invalid': true});
        }
      },
      (error) => {
        window.alert("Terjadi kesalahan dalam pemrosesan data, silahkan hubungi admin");
        console.log(error)
      }
    );
  }

}
