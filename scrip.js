const input = document.getElementById('input');
const button = document.getElementById('btn');
const taskList = document.getElementById('tasks');
const clearButton = document.getElementById('clearBtn');

function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

function updateClearButtonState() {
    clearButton.disabled = taskList.children.length === 0;
}

input.onkeyup = () => {
    let userData = input.value;
    if (userData.trim() !== '') {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText === '') {
        return; // Прерываем выполнение функции, если поле ввода пусто
    }

    // Проверяем, не добавлена ли уже такая задача
    const existingTasks = document.querySelectorAll('.list__element');
    for (const task of existingTasks) {
        if (task.textContent.trim() === taskText) {
            alert('Эта задача уже добавлена!');
            input.value = '';
            return;
        }
    }

    const newTask = document.createElement('li');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const taskSpan = document.createElement('span'); // Добавляем span для текста задачи

    doneBtn.textContent = '';
    doneBtn.classList.add('done__btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete__btn');
    newTask.classList.add('list__element');

    taskSpan.textContent = taskText;
    newTask.appendChild(taskSpan); // Добавляем span внутри newTask
    taskList.append(newTask);
    input.value = '';
    newTask.appendChild(doneBtn);
    newTask.appendChild(deleteBtn);


    doneBtn.addEventListener('click', () => {
        taskSpan.classList.toggle('cheked'); // Применяем класс к span внутри newTask
        saveTasks();
    });

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(newTask);
        saveTasks();
        updateClearButtonState();
    });

    newTask.addEventListener('click', () => {
        taskSpan.classList.toggle('cheked');
        saveTasks();
    });

    saveTasks();
    updateClearButtonState();
}

function clearTasks() {
    taskList.innerHTML = '';
    updateClearButtonState();
    saveTasks();
}

button.addEventListener('click', () => {
    addTask();
});

clearButton.addEventListener('click', () => {
    clearTasks();
});

input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
});

loadTasks();
updateClearButtonState();
