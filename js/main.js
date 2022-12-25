const todoList = document.querySelector('.todo');
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

highForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(tasksList, highInput.value, PRIORITY.HIGH);
  event.target.reset();
});

lowForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(tasksList, lowInput.value, PRIORITY.LOW);
  event.target.reset();
});

todoList.addEventListener('click', (event) => {
  changeStatusTask(tasksList);
});

let tasksList = [];

const addTask = (list, taskName, priority) => {
  if (taskName === '') {
    return;
  }

  list.push({
    name: taskName,
    priority,
    status: DEFAULT_STATUS,
    checkboxState: false,
  });

  render(list);
};

const changeStatusTask = (list) => {
  const target = event.target;
  const checkboxClick = target.classList.contains('task__checkbox-custom');

  if (checkboxClick) {
    const labelTask = target.parentNode;
    const taskName = labelTask.querySelector('.task__name');
    let taskItem = list.find((task) => task.name === taskName.textContent);
    taskItem.checkboxState = !taskItem.checkboxState;
  }

  render(list);
};

const render = (list) => {
  todoListHigh.innerHTML = '';
  todoListLow.innerHTML = '';

  list.forEach((task) => {
    if (task.checkboxState) {
      task.status = STATUS.DONE;
    } else {
      task.status = STATUS.TO_DO;
    }
  });

  list.forEach((task) => {
    if (task.priority === PRIORITY.HIGH) {
      createBlockTask(todoListHigh, task.name, task.status, task.checkboxState);
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
