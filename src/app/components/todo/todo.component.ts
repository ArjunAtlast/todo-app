import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../api/todo';
import { TodoService } from '../../services/todo.service';
import { ArrayList } from '@arjunatlast/jsds';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input()todo:Todo;
  selectedTodos: ArrayList<Todo>;

  constructor(private ts:TodoService) { }

  ngOnInit(): void {
    this.selectedTodos = this.ts.getSelectedTodos();
  }

  delete() {
    this.ts.removeTodo(this.todo);
  }

  select() {
    this.ts.selectTodo(this.todo);
  }

  unselect() {
    this.ts.unSelectTodo(this.todo);
  }

}
