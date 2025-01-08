document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('todo-list');
  const clearTasksButton = document.getElementById('clear-tasks');
  const allTasksButton = document.getElementById('all-tasks');
  const completedTasksButton = document.getElementById('completed-tasks');
  const pendingTasksButton = document.getElementById('pending-tasks');
  const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTask(taskInput.value);
      taskInput.value = '';
      saveTasks();
  });

  clearTasksButton.addEventListener('click', () => {
      taskList.innerHTML = '';
      saveTasks();
  });

  allTasksButton.addEventListener('click', () => {
      filterTasks('all');
  });

  completedTasksButton.addEventListener('click', () => {
      filterTasks('completed');
  });

  pendingTasksButton.addEventListener('click', () => {
      filterTasks('pending');
  });

  toggleDarkModeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      document.querySelector('.container').classList.toggle('dark-mode');
  });

  function addTask(task) {
      const li = document.createElement('li');
      li.innerHTML = `<span>${task}</span>`;

      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.addEventListener('click', () => {
          li.classList.toggle('completed');
          saveTasks();
      });

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
          const newTask = prompt('Edit task:', li.firstChild.textContent);
          if (newTask) {
              li.firstChild.textContent = newTask;
              saveTasks();
          }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
          li.classList.add('hide');
          setTimeout(() => {
              taskList.removeChild(li);
              saveTasks();
          }, 300);
      });

      li.appendChild(completeButton);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);

      setTimeout(() => {
          li.classList.add('show');
      }, 10);
  }

  function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach(li => {
          tasks.push({
              text: li.firstChild.textContent,
              completed: li.classList.contains('completed')
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          addTask(task.text);
          if (task.completed) {
              taskList.lastChild.classList.add('completed');
          }
      });
  }

  function filterTasks(filter) {
      const tasks = taskList.querySelectorAll('li');
      tasks.forEach(task => {
          switch (filter) {
              case 'all':
                  task.style.display = 'flex';
                  break;
              case 'completed':
                  task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                  break;
              case 'pending':
                  task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                  break;
          }
      });
  }

  loadTasks();
});