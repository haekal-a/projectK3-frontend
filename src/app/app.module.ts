import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './error/error.component';
import { TodosComponent } from './todos/todos.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LogoutComponent } from './auth/logout/logout.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DataTablesModule} from "angular-datatables";
import { TodoFormComponent } from './todo-form/todo-form.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {HttpInterceptorBasicAuthService} from "./service/http/http-interceptor-basic-auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import { NotifikasiComponent } from './home/user/notifikasi/notifikasi.component';
import { DaftarPinjamAdminComponent } from './home/user/daftar-pinjam-admin/daftar-pinjam-admin.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { UserComponent } from './home/user/user.component';
import { RegisterComponent } from './auth/register/register.component';
import { KonfirmasiComponent } from './home/user/konfirmasi/konfirmasi.component';
import { InputPeminjamanComponent } from './pinjam/input/input-peminjaman.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import { DaftarBarangComponent } from './pinjam/input/daftar-barang/daftar-barang.component';
import { KembaliComponent } from './pinjam/kembali/kembali.component';
import {PersetujuanService} from "./service/persetujuan.service";
import {DummyService} from "./service/dummy/dummy.service";
import {PinjamService} from "./service/pinjam.service";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {PersetujuanComponent} from "./pinjam/persetujuan/persetujuan.component";
import { RejectDialogComponent } from './util/reject-dialog/reject-dialog.component';
import { TanggalTerimaDialogComponent } from './util/tanggal-terima-dialog/tanggal-terima-dialog.component';
import { ConfirmBootboxComponent } from './util/confirm-bootbox/confirm-bootbox.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {UserService} from "./service/user.service";
import { DaftarPinjamUserComponent } from './home/user/daftar-pinjam-user/daftar-pinjam-user.component';
import { MonitorngComponent } from './monitoring/monitorng.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { HasilPencarianComponent } from './monitoring/hasil-pencarian/hasil-pencarian.component';
import { InformasiBarangComponent } from './monitoring/hasil-pencarian/informasi-barang/informasi-barang.component';
import { HistoriBarangComponent } from './monitoring/hasil-pencarian/histori-barang/histori-barang.component';
import { DialogPencarianComponent } from './monitoring/hasil-pencarian/dialog-pencarian/dialog-pencarian.component';
import {RegisterService} from "./service/auth/register.service";
import { KondisiPipe } from './pipes/kondisi.pipe';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {UtilService} from "./util/util.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PengembalianService} from "./service/pengembalian.service";
import {MonitoringService} from "./service/monitoring.service";
import { StatusPeminjamanPipe } from './pipes/status-peminjaman.pipe';
import {DatePipe} from "@angular/common";
import {HistoriPinjamComponent} from './home/user/histori-pinjam/histori-pinjam.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    TodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoFormComponent,
    NotifikasiComponent,
    DaftarPinjamAdminComponent,
    UserComponent,
    RegisterComponent,
    KonfirmasiComponent,
    InputPeminjamanComponent,
    DaftarBarangComponent,
    PersetujuanComponent,
    KembaliComponent,
    RejectDialogComponent,
    TanggalTerimaDialogComponent,
    ConfirmBootboxComponent,
    DaftarPinjamUserComponent,
    MonitorngComponent,
    HasilPencarianComponent,
    InformasiBarangComponent,
    HistoriBarangComponent,
    DialogPencarianComponent,
    KondisiPipe,
    StatusPeminjamanPipe,
    HistoriPinjamComponent
  ],
  entryComponents: [RejectDialogComponent, TanggalTerimaDialogComponent, ConfirmBootboxComponent, DialogPencarianComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    PersetujuanService,
    PinjamService,
    DummyService,
    UserService,
    RegisterService,
    PengembalianService,
    UtilService,
    MonitoringService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
