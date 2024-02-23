const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('.todos');


const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach((todo) => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo()
})

function addTodo(todo) {
    let text = input.value

    if (todo) {
        text = todo.task
    }

    if (text) {
        const todoEl = document.createElement('li');
        todoEl.textContent = text;

        if (todo && todo.completed === true) {
            todoEl.classList.add('completed');
        }

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateStorage()

        })

        todoEl.addEventListener('contextmenu', (event) => {
            event.preventDefault()

            todoEl.remove();
            updateStorage()

        })

        list.appendChild(todoEl)
        input.value = ''

        // update the localstorage

        updateStorage()


    }
}

function updateStorage() {
    let todos = [];
    let allLi = document.querySelectorAll('li')

    allLi.forEach((li) => {
        todos.push({
            task: li.innerText,
            completed: li.classList.contains('completed')
        });
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

