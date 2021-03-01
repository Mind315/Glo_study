'use strict';

class Todo {
   constructor(form, input, todoList, todoCompleted, todoContainer) {
      this.form = document.querySelector(form);
      this.input = document.querySelector(input);
      this.todoList = document.querySelector(todoList);
      this.todoCompleted = document.querySelector(todoCompleted);
      this.todoContainer = document.querySelector(todoContainer);
      this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
   }

   addToStorage() {
      localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));

   }

   render() {
      this.todoList.textContent = '';
      this.todoCompleted.textContent = '';
      this.todoData.forEach(this.createItem, this);
      this.addToStorage();
   }

   createItem(todo) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.key = todo.key;
      li.insertAdjacentHTML('beforeend', `
         <span class="text-todo">${todo.value}</span>
         <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
         </div>
      `);

      if(todo.completed) {
         this.todoCompleted.append(li);
      } else {
         this.todoList.append(li);
      }
   }
   addTodo(e) {
      e.preventDefault();
      if(this.input.value.trim()) {
         const newTodo = {
            value: this.input.value,
            completed: false,
            key: this.generateKey(),
         };
         this.todoData.set(newTodo.key, newTodo);
         this.render();
      } else { // --------------- тут запрещаем добавление пустого поля
         alert('Пустое поле нельзя добавить!');
         return;
      }
      
     
   }
   
   generateKey() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
   }
   deleteItem(elem) {
      this.todoData.forEach((item, index) => {
         if(elem.closest('.todo-item').key === item.key) {
            this.todoData.delete(index);
         }
      });
      this.render();
   }

   completedItem(elem) {
      this.todoData.forEach((item)=> {
         if (elem.closest('.todo-item').key === item.key){
            item.completed = !item.completed;
            this.render();
         }
      });
      this.render();
   }
   handler() {
      //делегиование
      this.todoContainer.addEventListener('click', (event)=> {
         let target = event.target;
         if (target.matches('.todo-complete')){
            this.completedItem(target);
         } else if (target.matches('.todo-remove')) {
            this.deleteItem(target);
         }
      });
   }
   init() {
      this.form.addEventListener('submit', this.addTodo.bind(this));
      this.render();
      this.handler();
   }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();

