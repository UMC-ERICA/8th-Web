
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo): void => {  //.foreach는 콜백함수로 todos라는 배열에 들어있는 값들을 하나씩 불러오는 역할을 함함 
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// 할 일 입력 처리
const getTodoText = (): string => {
    return todoInput.value.trim();
};

// 할 일 추가
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text});
    todoInput.value = '';
    renderTasks();
};

// 할 일 상태 완료로 변경
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

// 할 일 삭제
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTasks();
};

// 할 일 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container_item-button');

    if (isDone) {
        button.textContent = '삭제'; //true일 경우 완료 버튼이 눌린 것이기 때문에 text를 삭제로 변경
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';  //false일 경우 완료 버튼이 눌리지 않은 것이므로 text를 완료 상태로 유지
        button.style.backgroundColor = '#28a745';
    }
    // 추가 이벤트 리스너
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
}

// form submit 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text){
        addTodo(text);
    }
});


renderTasks();
