/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable strict */
'use strict';

class Todo {
	constructor(form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
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

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim() !== '') {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Напишите дело');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem() {
        console.log('Вызвана функция Удаления');
        // По ключу найти элемент и удалить его из new Map
        this.render();
    }

    completedItem() {
        console.log('Вызвана функция Добавления');
        // Перебрать все елементы todoData через forEach и найти элемент которому 
        // соответствует ключ на который мы кликнули. И поменять значение completed.
        console.log(this.todoData);
        this.todoData.forEach(item => {
            console.log(item);
        });

    }

    handler() {
        this.todoList.addEventListener('click', () => {
            if (event.target.matches('.todo-complete')) {
                this.completedItem();
            } else if (event.target.matches('.todo-remove')) {
                this.deleteItem();
            }
        });
        this.todoCompleted.addEventListener('click', () => {
            if (event.target.matches('.todo-complete')) {
                this.completedItem();
            } else if (event.target.matches('.todo-remove')) {
                this.deleteItem();
            }
        });
    }

	init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.handler();
        this.render();
	}
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();

