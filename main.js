const activeTasks = document.getElementById('active-tasks');
const completedTasks = document.getElementById('completed-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(name) {
  tasks.push({ name, completed: false });

  const newTask = document.createElement('li');
  newTask.innerHTML = `
    <span class="task-name">${name}</span>
    <span class="task-actions">
      <button class="complete-btn">Complete</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </span>
  `;

  activeTasks.appendChild(newTask);

  bindTaskEvents(newTask);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function completeTask(taskIndex) {
  tasks[taskIndex].completed = true;

  const completedTask = activeTasks.children[taskIndex];
  activeTasks.removeChild(completedTask);
  completedTasks.appendChild(completedTask);

  const completeBtn = completedTask.querySelector('.complete-btn');
  completeBtn.disabled = true;

  const editBtn = completedTask.querySelector('.edit-btn');
  editBtn.disabled = true;

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskIndex, taskList) {
  tasks.splice(taskIndex, 1);

  const taskItem = taskList.children[taskIndex];
  taskList.removeChild(taskItem);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskIndex, newName) {
  tasks[taskIndex].name = newName;

  const taskItem = activeTasks.children[taskIndex];
  const taskName = taskItem.querySelector('.task-name');
  taskName.textContent = newName;


  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function bindTaskEvents(taskItem) {
  const completeBtn = taskItem.querySelector('.complete-btn');
  completeBtn.addEventListener('click', () => {
    const taskIndex = Array.from(activeTasks.children).indexOf(taskItem);
    completeTask(taskIndex);
  });

  const editBtn = taskItem.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    const taskIndex = Array.from(activeTasks.children).indexOf(taskItem);
    const newName = prompt('Enter the new task name:', tasks[taskIndex].name);

    if (newName !== null && newName.trim() !== '') {
      editTask(taskIndex, newName.trim());
    }
  });

  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    const taskIndex = Array.from(activeTasks.children).indexOf(taskItem);
    deleteTask(taskIndex, activeTasks);
  });
}

function bindCompletedTaskEvents(taskItem) {
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    const taskIndex = Array.from(completedTasks.children).indexOf(taskItem);
    deleteTask(taskIndex, completedTasks);
  });
}

if (tasks.length === 0) {
  addTask('Buy milk');
  addTask('Walk the dog');
  addTask('Clean the house');
} else {
  tasks.forEach((task) => {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
      <span class="task-name">${task.name}</span>
      <span class="task-actions">
      <button class="complete-btn" ${task.completed ? 'disabled' : ''}>Complete</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      </span
      `;

    if (task.completed) {
      completedTasks.appendChild(newTask);
    } else {
      activeTasks.appendChild(newTask);
    }

    bindTaskEvents(newTask);

  });
}

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    addTask(taskName);
    taskInput.value = '';
  }
});