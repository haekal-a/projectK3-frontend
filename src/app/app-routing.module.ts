import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ErrorComponent} from './error/error.component';
import {TodosComponent} from './todos/todos.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {RouteGuardService} from './service/auth/route-guard.service';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {UserComponent} from './home/user/user.component';
import {RegisterComponent} from './auth/register/register.component';
import {InputPeminjamanComponent} from './pinjam/input/input-peminjaman.component';
import {PersetujuanComponent} from './pinjam/persetujuan/persetujuan.component';
import {KembaliComponent} from './pinjam/kembali/kembali.component';
import {MonitorngComponent} from './monitoring/monitorng.component';
import {HasilPencarianComponent} from './monitoring/hasil-pencarian/hasil-pencarian.component';

// setting route/ url disini
const routes: Routes = [
  {path: '', component: LoginComponent}, // masukan url setelah path dan route ke komponen mana pada component
  {path: 'register', component: RegisterComponent}, // masukan url setelah path dan route ke komponen mana pada component
  // cara implementasi routeguardservice, daftarkan pada semua menu yang boleh digunakan ketika user sudah login.
  {path: 'welcome/:username', component: WelcomeComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'monitoring', component: MonitorngComponent, canActivate: [RouteGuardService]},
  {path: 'pinjam/input', component: InputPeminjamanComponent, canActivate: [RouteGuardService]},
  {path: 'pinjam/edit/:id', component: InputPeminjamanComponent, canActivate: [RouteGuardService]},
  {path: 'pinjam/setuju', component: PersetujuanComponent, canActivate: [RouteGuardService]},
  {path: 'pinjam/kembali', component: KembaliComponent, canActivate: [RouteGuardService]},
  {path: ':role', component: UserComponent, canActivate: [RouteGuardService]},

  // {path: 'todos', component: TodosComponent, canActivate: [RouteGuardService]},
  // {path: 'todo/form/:id', component: TodoFormComponent, canActivate: [RouteGuardService]},

  // selalu buat path seblum path **
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
