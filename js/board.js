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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="board__button">${element['title']}</div>`;
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