setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');

let profiles = [{
    'name': 'Addy W.',
    'email': 'soundso@email.com'
  },
  {
    'name': 'Alexander K.',
    'email': 'soundso@email.com'
  },
  {
    'name': 'Christoph W.',
    'email': 'soundso@email.com'
  }
]

let allTasks = [];

function renderAddTask() {
  renderHTML();
}

/**
 * This function is used to create a task and put the data into a JSON.
 */
function createTask() {
  let time = new Date();
  let title = document.getElementById('title');
  let date = document.getElementById('date');
  let category = document.getElementById('category');
  let status = document.getElementById('status');
  let description = document.getElementById('description');

  let task = {
    'id': time.getTime(),
    'title': title.value,
    'date': date.value,
    'category': category.value,
    'status': status.value,
    'description': description.value,
  };

  allTasks.push(task);
  backend.setItem('allTasks', JSON.stringify(allTasks))
  backend.setItem('profiles', JSON.stringify(profiles))

  clearForm();
}
/**
 * this function clears the Form
 */
function clearForm() {
  title.value = '';
  date.value = '';
  category.value = '';
  status.value = '';
  description.value = '';
}

function chooseAssignedTo() {
  document.getElementById('selectId').classList.remove('d-none');

  document.getElementById('selectId').innerHTML = ''
  for (let i = 0; i < profiles.length; i++) {
    document.getElementById('selectId').innerHTML += `
      <option>${profiles[i]['name']}, ${profiles[i]['email']}</option>
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
      <input type="text" id="title" required placeholder="Management meeting preparation">
    </div>

    <div class="form-control">
      <label for="date">Due Date</label>
      <input type="date" id="date" placeholder="02/07/20">
    
    </div>

    <div class="form-control">
      <label for="category">Category</label>
      <select type="text" id="category" placeholder="Management">
        <option>Marketing</option>
        <option>Sales</option>
        <option>Design</option>
        <option>Frontend</option>
        <option>Backend</option>
      </select>
    </div>

    <div class="form-control ">
      <label for="status">Status</label>
      <select type="text" id="status">
        <option>Todo</option>
        <option>In Progress</option>
        <option>Testing</option>
      </select>
    </div>

    <div class="form-control description-section">
      <label for="description">Description</label>
      <textarea id="description"  placeholder="Type in your description..."></textarea>
    </div>

    <div class="form-control description-section">
      <label for="profile">Assigned To</label>
      <div id="profiles" class="profiles">
        <img onclick="chooseAssignedTo()" id="profile" class="profile-img icon" src="../img/icons8-plus.png">
        <select class="d-none" id="selectId"></select>
      </div>
      <div class="buttons">
        <button onclick="clearForm()" id="cancel">Cancel</button>
        <button onclick="createTask()" id="createTask">Create Task</button>
      </div>
    </div>
  </div>
 `;
}