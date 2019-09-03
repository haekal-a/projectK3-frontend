import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ErrorComponent} from "./error/error.component";
import {TodosComponent} from "./todos/todos.component";
import {LogoutComponent} from "./logout/logout.component";
import {RouteGuardService} from "./service/route-guard.service";
import {TodoFormComponent} from "./todo-form/todo-form.component";


// setting route/ url disini
const routes: Routes = [
  {path: '', component: LoginComponent}, // masukan url setelah path dan route ke komponen mana pada component
  // cara implementasi routeguardservice, daftarkan pada semua menu yang boleh digunakan ketika user sudah login.
  {path: 'welcome/:username', component: WelcomeComponent, canActivate: [RouteGuardService]},
  {path: 'todos', component: TodosComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'todo/form/:id', component: TodoFormComponent, canActivate: [RouteGuardService]},

  // selalu buat path seblum path **
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
