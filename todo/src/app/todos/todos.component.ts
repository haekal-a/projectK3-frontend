import {Component, OnInit} from "@angular/core";
import {TodoServiceService} from "../service/data/todo-service.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {BasicAuthService} from "../service/basic-auth.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  todos: TodoModel[];
  error;
  deleteSuccess = false;

  constructor(private todoService: TodoServiceService, private router: Router, private basicAuth : BasicAuthService) {
  }

  username = this.basicAuth.getAuthenticatedUser();

  ngOnInit() {
    this.getAllTodos();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  getAllTodos() {
    this.todoService.getAllTodos(this.username).subscribe(
      response => {
        this.todos = response;
        this.dtTrigger.next();
      },
      error => this.error = error.message
    )
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        this.deleteSuccess = true;
        this.dtTrigger.unsubscribe();
        this.getAllTodos();
      },
      error => window.alert(error.message)
    );
  }

  updateTodo(id) {
    this.router.navigate(['todo/form', id])
  }

  createTodo() {
    this.router.navigate(['todo/form', -1])
  }

}

export class TodoModel {
  constructor(public id: number,
              public description: string,
              public targetDate,
              public done: boolean) {
  }
}
