//todo: add profiles & allTasks to main.js
setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');

let profiles = [{
    'name': 'Addy W.',
    'email': 'soundso@email.com',
    'id': 1,
  },
  {
    'name': 'Alexander K.',
    'email': 'soundso@email.com',
    'id': 2,
  },
  {
    'name': 'Christoph W.',
    'email': 'soundso@email.com',
    'id': 3
  }
]

let allTasks = [];

function renderAddTask() {
  renderHTML();
}
// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showErrorText(textarea, message) {
  const formControl = textarea.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showErrorSelect(select, message) {
  const formControl = select.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showErrorUser(selectId, message) {
  selectId = document.getElementById('selectId');
  const formControl = selectId.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function showSuccessText(textarea) {
  const formControl = textarea.parentElement;
  formControl.className = 'form-control success';
}
/**
 *Create a task and puts the data into a JSON.
 */
function createTask() {
  let time = new Date();
  let title = document.getElementById('title');
  let date = document.getElementById('date');
  let category = document.getElementById('category');
  let status = document.getElementById('status');
  let description = document.getElementById('description');
  let user = document.getElementById('selectId');

  let task = {
    'id': time.getTime(),
    'title': title.value,
    'date': date.value,
    'category': category.value,
    'status': status.value,
    'description': description.value,
    'user': user.value,
  };

  if (title.value == '') {
    showError(title, 'Title is required')
  } else {
    showSuccess(title)
  }
  if (date.value == '') {
    showError(date, 'Date is required')
  } else {
    showSuccess(date)
  }

  if (category.value == '') {
    showError(category, 'Choose an category')
  } else {
    showSuccess(category)
  }
  if (status.value == '') {
    showError(status, 'Choose an status')
  } else {
    showSuccess(status)
  }
  if (description.value == '') {
    showErrorText(description, 'Describe your task')
  } else {
    showSuccessText(description)
  }

  if (user.value == 1 || user.value == 2 || user.value == 3 && title.value == !null) {
    allTasks.push(task);
    backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log('task pushed')
    clearForm();
  } else {
    showErrorUser()
    console.log('todo: user error')
  }
}
/**
 * this function clears the Form
 */
function clearForm() {
  let user = document.getElementById('selectId');
  document.getElementById('selectId').classList.add('d-none');
  title.value = '';
  date.value = '';
  category.value = '';
  status.value = '';
  description.value = '';
  user.value = null;
}

function chooseAssignedTo() {
  document.getElementById('selectId').classList.remove('d-none');

  document.getElementById('selectId').innerHTML = ''
  for (let i = 0; i < profiles.length; i++) {
    document.getElementById('selectId').innerHTML += `
      <option value="${profiles[i]['id']}">${profiles[i]['name']}, ${profiles[i]['email']}</option>
  `;
  }
}

async function init() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

/**
 * @returns all the rendered HTML elements
 */
function renderHTML() {
  return document.getElementById('mainbody').innerHTML = `
  <header>
    <h2>All Tasks</h2>
    <span class="smallText">Learning Management System Project</span>
  </header>

  <div id="form" class="form">
    <div class="form-control">
      <label for="title" >Title</label>
      <input type="text" id="title" placeholder="Management meeting preparation">
      <small>Error message</small>
    </div>

    <div class="form-control">
      <label for="date">Due Date</label>
      <input type="date" id="date" placeholder="02/07/20">
      <small>Error message</small>
    </div>

    <div class="form-control">
      <label for="category">Category</label>
      <select type="text" id="category" placeholder="Management">
        <option>Marketing</option>
        <option>Sales</option>
        <option selected>Design</option>
        <option>Frontend</option>
        <option>Backend</option>
      </select>
      <small>Error message</small>
    </div>

    <div class="form-control ">
      <label for="status">Status</label>
      <select type="text" id="status">
        <option value="todo" selected>Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="testing">Testing</option>
      </select>
      <small>Error message</small>
    </div>

    <div class="form-control description-section">
      <label for="description">Description</label>
      <textarea id="description" placeholder="Type in your description..."></textarea>
      <small>Error message</small>
    </div>

    <div class="form-control description-section">
      <label for="profile">Assigned To</label>
      <div id="profiles" class="profiles">
        <img onclick="chooseAssignedTo()" id="profile" class="profile-img icon" src="../img/icons8-plus.png">
        <select class="d-none" id="selectId"></select>
      </div>
      <small>Error message</small>
      <div class="buttons">
        <button onclick="clearForm()" id="cancel">Cancel</button>
        <button onclick="createTask()" id="createTask">Create Task</button>
      </div>
    </div>
  </div>
 `;
}