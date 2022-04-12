setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');


let tickets = [];           // empty array for the JSON data from backend
let currentDraggedElement;  // global var for the drag n drop feature


async function getBackend() {
    await downloadFromServer();
    tickets = JSON.parse(backend.getItem('allTasks')) || [];
}


/**
 * Adds an id to each JSON element in order for drag n drop to work
 */
function addIDtoJSON() {
    for (let index = 0; index < tickets.length; index++) {
        tickets[index]['id'] = index;
    }
}


async function renderBoard() {
    await getBackend();
    addIDtoJSON();
    document.getElementById("mainbody").innerHTML = renderBoardHTML();
    updateHTML();
}


function renderBoardHTML() {
    return `
        <div class="mainbody__container">
            <div class="row board__row">

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2 class="noSelect">TO DO</h2>
                        <div class="board__area" id="todo" ondrop="moveTo('todo'); removeHighlight('todo')" ondragleave="removeHighlight('todo')" ondragover="allowDrop(event); highlight('todo')">
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2 class="noSelect">IN PROGRESS</h2>
                        <div class="board__area" id="inprogress" ondrop="moveTo('inprogress'); removeHighlight('inprogress')" ondragleave="removeHighlight('inprogress')" ondragover="allowDrop(event); highlight('inprogress')">
                        </div>
                    </div>
                </div>

                <div class="board__space"></div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2 class="noSelect">TESTING</h2>
                        <div class="board__area" id="testing" ondrop="moveTo('testing'); removeHighlight('testing')" ondragleave="removeHighlight('testing')" ondragover="allowDrop(event); highlight('testing')">
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2 class="noSelect">DONE</h2>
                        <div class="board__area" id="done" ondrop="moveTo('done'); removeHighlight('done')" ondragleave="removeHighlight('done')" ondragover="allowDrop(event); highlight('done')">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}

/* Drag n Drop */

function updateHTML() {
    updateHTMLTodo();
    updateHTMLInprogress();
    updateHTMLTesting();
    updateHTMLDone();
}


function generateTodoHTML(element) {
    return `<div onclick="editBoardHTMLElement(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="board__button">${element['title']}</div>`;
}


function updateHTMLTodo() {
    let todo = tickets.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }
}


function updateHTMLInprogress() {
    let inprogress = tickets.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';

    for (let index = 0; index < inprogress.length; index++) {
        const element = inprogress[index];
        document.getElementById('inprogress').innerHTML += generateTodoHTML(element);
    }
}


function updateHTMLTesting() {
    let testing = tickets.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = '';

    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }
}


function updateHTMLDone() {
    let done = tickets.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function startDragging(id) {
    currentDraggedElement = id;
}


async function moveTo(status) {
    tickets[currentDraggedElement]['status'] = status; // i.E. ticket with id 1: the category array changes to 'todo' or 'inprogress'
    updateHTML();
    await backend.setItem('allTasks', JSON.stringify(tickets)); // saves the array after a drop
}


function highlight(id) {
    document.getElementById(id).classList.add('drag__area__highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag__area__highlight');
}


/**
 * When a task element in the board is clicked
 */
 function editBoardHTMLElement(id) {
    openBoardPopup(id);

 }

 //Opens the Popup Window
function openBoardPopup(i) {
    document.getElementById('pop-up-window').innerHTML = ``;
    document.getElementById('pop-up-window').classList.remove('dont-show');
    const element = tickets[i];
    const profileID = element['user']-1;
    document.getElementById('pop-up-window').innerHTML +=
        `
    <div id="pop-up-content">
        <div id="pop-up-display">
            <p><b>Currently assigned to:</b> ${profiles[profileID]['name']} ${profiles[profileID]['email']}</p>
            <p><b>Current category:</b> ${tickets[i]['category']}</p>
            <p><b>Current details:</b> ${tickets[i]['description']}</p>
        </div>
        <div id="pop-up-submit">
            <select class="" id="popup-select">
                <option value="1">Addy W., soundso@email.com</option>
                <option value="2">Alexander K., soundso@email.com</option>
                <option value="3">Christoph W., soundso@email.com</option>
            </select>
            <select type="text" id="popup-category" placeholder="Category">
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
            </select>
            <input type="text" id="description-input" placeholder="Neue Beschreibung eingeben..">
            <button id="save-task-button" onclick="saveNewTaskBoard(${i})">Task speichern</button>
            <button id="delete-task-button" onclick="deleteTaskBoard(${i})">Task Löschen!</button>
        </div>
    </div>
    <img id="closebutton" src="img/xclose.ico" onclick="closePopup(${i})">
    `

    popupPresetBoard(i);
}

//Set the popup selection fields to value of the current task
function popupPresetBoard(i){
    document.getElementById('popup-select').value = `${tickets[i]['user']}`;
    document.getElementById('popup-category').value = `${tickets[i]['category']}`;
    document.getElementById('description-input').value = `${tickets[i]['description']}`;
}

//Saves the new Task in the backend, with values given by the input fields
async function saveNewTaskBoard(i) {
    tickets[i]['user'] = +document.getElementById('popup-select').value;
    tickets[i]['category'] = document.getElementById('popup-category').value;
    tickets[i]['description'] = document.getElementById('description-input').value;
    await backend.setItem('allTasks', JSON.stringify(tickets));
    closePopup();
    updateHTML();
}

async function deleteTaskBoard(i) {
    tickets.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    closePopup();
    updateHTML();
}