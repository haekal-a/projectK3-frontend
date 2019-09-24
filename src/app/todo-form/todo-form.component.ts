import {Component, OnInit} from "@angular/core";
import {TodoServiceService} from "../service/data/todo-service.service";
import {TodoModel} from "../todos/todos.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BasicAuthService} from "../service/auth/basic-auth.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  id: number;
  todo: TodoModel;
  user = this.basicAuth.getAuthenticatedUser();

  constructor(private todoService: TodoServiceService, private router: ActivatedRoute, private navigation: Router, private basicAuth : BasicAuthService) {
  }

  ngOnInit() {
    // data yang ada di URL, bisa diambil melalui ini karena pathnya adalah id
    this.id = this.router.snapshot.params['id'];
    // untuk mencegah async yang membuat browser membaca todo sebagai null sebelum bisa dipanggil oleh fungsi get
    // maka lebih baik menginisiasi todo dengan nilai adefault terlebih dahulu
    // ketika service dalam kondisi normal, user tidak akan menyadari pergantian default valuenya
    this.todo = new TodoModel(this.id, "", null, true);

    if (this.id != -1) {
      this.todoService.getTodo(this.user, this.id).subscribe(
        response => {
          this.todo = response;
        }
      )
    }
  }

  saveTodo() {
    if(this.id != -1){ // update
      this.todoService.putTodo(this.user, this.id, this.todo).subscribe(
        response => {
          window.alert("Update Data Successful");
          this.navigation.navigate(['todos'])
        }
      )

    } else { // create
      this.todoService.createTodo(this.user, this.todo).subscribe(
        response => {
          window.alert("A New Todo has been created");
          this.navigation.navigate(['todos'])
        }
      )
    }
  }
}
