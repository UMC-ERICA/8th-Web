"use strict";
// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input');
const todoFrom = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
// - 할 일 목록 렌더링하는 함수 정의
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
// 3. 할 일 텍스트 입력 처리 함수
const getTodoText = () => {
    return todoInput.value.trim();
};
//4. 할 일 추가 함수
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};
// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
// 6. 완료된 할 일 삭제 함수  
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 다르게 생성)
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container_item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
// 8. 폼 제출 이벤트 리스너
todoFrom.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
