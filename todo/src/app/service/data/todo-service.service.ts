import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TodoModel} from "../../todos/todos.component";
import {HttpHeaders} from "@angular/common/http";
import {API_URL, API_URL_JPA} from "../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) {
  }

  getAllTodos(username) {
    return this.http.get<TodoModel[]>(`${API_URL_JPA}/user/${username}/todos`)
  }

  deleteTodo(username, id) {
    return this.http.delete(`${API_URL_JPA}/user/${username}/todos/${id}`)
  }

  getTodo(username, id) {
    return this.http.get<TodoModel>(`${API_URL_JPA}/user/${username}/todos/${id}`)
  }

  putTodo(username, id, todo) {
    return this.http.put<TodoModel>(`${API_URL_JPA}/user/${username}/todos`, todo)
  }

  createTodo(username, todo) {
    return this.http.post(`${API_URL_JPA}/user/${username}/todos`, todo)
  }

}
