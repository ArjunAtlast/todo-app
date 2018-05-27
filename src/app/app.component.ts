import { Component, OnInit } from '@angular/core';
import { Todo } from './api/todo';
import {ArrayList} from "@arjunatlast/jsds";
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todoList:ArrayList<Todo>;
  selectedTodos:ArrayList<Todo>;
  todoTitle:string;
  todoContent:string;

  constructor(private ts:TodoService) {}

  ngOnInit() {
    this.todoList = this.ts.getTodos();
    this.selectedTodos = this.ts.getSelectedTodos();
  }

  addTodo():void {
    this.ts.addTodo(new Todo(this.todoTitle, this.todoContent));
  }

  deleteTodos():void {
    this.ts.removeSelectedTodos();
  }

  backup():void {
    this.ts.backup();
  }

  restore(backupFile:File):void {
    this.ts.restore(backupFile);
  }

  openFile():void {
    document.getElementById("backup_file").click();
  }

}
