const highForm = document.querySelector('.todo__form--high');
const lowForm = document.querySelector('.todo__form--low');
const highInput = document.querySelector('.task-new__input--high');
const lowInput = document.querySelector('.task-new__input--low');

const STATUS = {
  TO_DO: 'To Do',
  DONE: 'Done',
};

const PRIORITY = {
  LOW: 'Low',
  HIGH: 'High',
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
  });
};
