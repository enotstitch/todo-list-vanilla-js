const highForm = document.querySelector('.todo__form--high');
const lowForm = document.querySelector('.todo__form--low');
const highInput = document.querySelector('.task-new__input--high');
const lowInput = document.querySelector('.task-new__input--low');
const todoListHigh = document.querySelector('.todo__list--high');
const todoListLow = document.querySelector('.todo__list--low');

const STATUS = {
  TO_DO: 'todo',
  DONE: 'done',
};

const PRIORITY = {
  LOW: 'low',
  HIGH: 'high',
};

const DEFAULT_STATUS = STATUS.TO_DO;
const DEFAULT_PRIORITY = PRIORITY.HIGH;

highForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(tasksList, highInput.value, PRIORITY.HIGH, DEFAULT_STATUS);
  event.target.reset();
});

lowForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(tasksList, lowInput.value, PRIORITY.LOW, DEFAULT_STATUS);
  event.target.reset();
});

let tasksList = [];

const addTask = (list, taskName, priority, status) => {
  if (taskName === '') {
    return;
  }

  list.push({
    name: taskName,
    priority,
    status,
    checkboxState: false,
  });

  render(list);
};

const render = (list) => {
  todoListHigh.innerHTML = '';
  todoListLow.innerHTML = '';

  list.forEach((task) => {
    if (task.priority === PRIORITY.HIGH) {
      createBlockTask(todoListHigh, task.name, task.status, task.checkboxState);
      return;
    } else if (task.priority === PRIORITY.LOW) {
      createBlockTask(todoListLow, task.name, task.status, task.checkboxState);
    }
  });
};

const createBlockTask = (todoList, taskName, status, checkboxState) => {
  const labelTask = document.createElement('label');
  labelTask.className = 'todo__task task';
  labelTask.setAttribute('data-status', status);
  todoList.prepend(labelTask);

  const checkboxTaskReal = document.createElement('input');
  checkboxTaskReal.className = 'task__checkbox-real';
  checkboxTaskReal.setAttribute('type', 'checkbox');
  checkboxTaskReal.checked = checkboxState;
  labelTask.prepend(checkboxTaskReal);

  const checkboxTaskCustom = document.createElement('span');
  checkboxTaskCustom.className = 'task__checkbox-custom';
  labelTask.append(checkboxTaskCustom);

  const textTaskName = document.createElement('p');
  textTaskName.className = 'task__name';
  textTaskName.textContent = taskName;
  labelTask.append(textTaskName);

  const buttonDeleteTask = document.createElement('button');
  buttonDeleteTask.className = 'task-delete btn-reset';
  labelTask.append(buttonDeleteTask);
};
