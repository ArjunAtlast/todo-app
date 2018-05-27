import { Injectable } from '@angular/core';
import { Todo } from '../api/todo';
import { ArrayList } from '@arjunatlast/jsds';

declare const Buffer;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private selectedTodos: ArrayList<Todo> = new ArrayList<Todo>(100);
  private todoList:ArrayList<Todo> = new ArrayList<Todo>(100);

  constructor() {
  }

  getTodos():ArrayList<Todo> {
    this.readTodos();
    return this.todoList;
  }

  getSelectedTodos():ArrayList<Todo> {
    return this.selectedTodos;
  }

  addTodo(todo:Todo):void {
    this.todoList.add(todo) && this.saveTodos();
  }

  removeTodo(todo:Todo):void {
    this.todoList.remove(todo) && this.saveTodos();
  }

  selectTodo(todo:Todo):void {
    this.selectedTodos.add(todo);
  }

  unSelectTodo(todo:Todo):void {
    this.selectedTodos.remove(todo);
  }

  removeSelectedTodos():void {
    this.todoList.removeAll(this.selectedTodos.toArray()) && this.saveTodos();
    this.selectedTodos.clear();
  }

  backup():void {
    let data = this.todoList.toString((todo) => (JSON.stringify({title: todo.title, content: todo.content})));
    let file = new Blob([btoa(data)], {type: 'application/backup'});
    let fileUrl = URL.createObjectURL(file);
    window.open(fileUrl);
  }

  restore(file:Blob):void {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let backupList = new ArrayList<Todo>().fromString(atob(reader.result), (item) => {
        let obj = JSON.parse(item);
        return new Todo(obj.title, obj.content);
      });
      this.todoList.addAll(backupList.toArray());
      this.saveTodos();
    }
  }

  private saveTodos():void {
    localStorage.setItem("todos", this.todoList.toString((todo) => {
      return JSON.stringify({title: todo.title, content: todo.content});
    }));
  }

  private readTodos():void {
    let json = localStorage.getItem("todos");
    if(json) this.todoList = this.todoList.fromString(json, (item) => {
      let obj = JSON.parse(item);
      return new Todo(obj.title, obj.content);
    });
  }
}
