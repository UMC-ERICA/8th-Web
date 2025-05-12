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

const renderTask = ():void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo):void => {
        const li = createTodoElement(todo, false);
        if (li) todoList.appendChild(li);
    });

    doneTasks.forEach((todo):void => {
        const li = createTodoElement(todo, true);
        if (li) doneList.appendChild(li);
    });
};

//공백 잘라줌
const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string) : void => {
    todos.push({id:Date.now(), text});
    todoInput.value ='';
    renderTask();
};

const compleTodo = (todo: Todo) : void => {
    todos = todos.filter((t): Boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};

const deleteTodo = (todo : Todo): void => {
    doneTasks = doneTasks.filter((t) : Boolean => t.id !== todo.id);
    renderTask();
};

const createTodoElement = (todo:Todo, isDone: boolean) : HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = "rgb(242, 80, 96)";
    } else {
        button.textContent = '완료!!';
        button.style.backgroundColor = "rgb(69, 60, 231)";
    }

    button.addEventListener('click', ():void => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            compleTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

todoForm.addEventListener('submit', (event:Event):void => {
    event.preventDefault();
    const text = getTodoText();
    if(text) {
        addTodo(text);
    }
});

renderTask();

