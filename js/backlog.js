setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');

//rendering the basic table titles first, then get actual content with generateFrontend function
async function renderBacklog() {
    await init();
    generateHeader();
    generateFrontend();
}

//downloading the allTasks JSON from backend
async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    profiles = JSON.parse(backend.getItem('profiles')) || [];
}

//print the given attributes of allTasks JSON
function generateFrontend() {
    document.getElementById('mainbody').innerHTML = ``;
    generateHeader();
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        document.getElementById('mainbody').innerHTML +=
            `
        <div id="task-field">
            <div class="task-title col-4 card-design-left">
                <p>${profiles[i]['name']} ${profiles[i]['email']}</p>
            </div>
            <div class="task-category col-2 card-design">
                <p>${element['category']}</p>
                </div>
            <div class="task-description col-5 card-design-right">
                <p>${element['description']}<p>
            </div>
            <div class="col-1 pencil-design">
                <img class="pencil-icon" src="../img/pencil.ico" onclick="editBacklog(${i})">
            </div>
        </div>

        `;
    }
}

//onclick function to start the chain
function editBacklog(i) {
    generatePopup(i);
    generateFrontend();
}

//Closes the Popup Window
function closePopup() {
    document.getElementById('pop-up-window').classList.add('dont-show');
}

//Saves the new Task in the backend, with values given by the input fields
async function saveNewTask(i) {
    profiles[i]['name'] = document.getElementById('name-input').value;
    profiles[i]['email'] = document.getElementById('email-input').value;
    allTasks[i]['category'] = document.getElementById('category-input').value;
    allTasks[i]['description'] = document.getElementById('description-input').value;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    closePopup();
    generateHeader();
    generateFrontend();
}

async function deleteTask(i) {
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    closePopup();
    generateHeader();
    generateFrontend();
}

//Opens the Popup Window
function generatePopup(i) {
    document.getElementById('pop-up-window').innerHTML = ``;
    document.getElementById('pop-up-window').classList.remove('dont-show');
    document.getElementById('pop-up-window').innerHTML +=
        `
    <div id="pop-up-content">
        <div id="pop-up-display">
            <p><b>Currently assigned to:</b> ${profiles[i]['name']} ${profiles[i]['email']}</p>
            <p><b>Current category:</b> ${allTasks[i]['category']}</p>
            <p><b>Current details:</b> ${allTasks[i]['description']}</p>
        </div>
        <div id="pop-up-submit">
            <input type="text" id="name-input" placeholder="Neuen Namen eingeben..">
            <input type="text" id="email-input" placeholder="Neue E-Mail eingeben..">
            <input type="text" id="category-input" placeholder="Neue Kategorie eingeben..">
            <input type="text" id="description-input" placeholder="Neue Beschreibung eingeben..">
            <button id="save-task-button" onclick="saveNewTask(${i})">Task speichern</button>
            <button id="delete-task-button" onclick="deleteTask(${i})">Task Löschen!</button>
        </div>
    </div>
    <img id="closebutton" src="img/xclose.ico" onclick="closePopup(${i})">
    `
}

//Generates titles of backlog page
function generateHeader() {
    document.getElementById('mainbody').innerHTML =
        `
        <h2>Backlog</h2>
        
        <div id="task-field">
            <div class="task-title col-4">
                <p><b>Assigned to</b></p>
            </div>
            <div class="task-category col-2">
                <p><b>Category</b></p>
                </div>
            <div class="task-description col-5">
                <p><b>Details</b><p>
            </div>
        </div>
        `;
}