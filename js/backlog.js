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
}

//print the given attributes of allTasks JSON
function generateFrontend(){
    document.getElementById('mainbody').innerHTML = ``;
    generateHeader();
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        document.getElementById('mainbody').innerHTML +=
        `
        <div id="task-field">
            <div class="task-title col-4">
                <p>${element['title']}</p>
            </div>
            <div class="task-category col-2">
                <p>${element['category']}</p>
                </div>
            <div class="task-description col-5">
                <p>${element['description']}<p>
            </div>
            <div class="col-1">
                <img class="pencil-icon" src="../img/pencil.ico" onclick="editBacklog(${i})">
            </div>
        </div>

        `;
    }
}

//onclick function to start the chain
function editBacklog(i){
   generatePopup(i);
   generateFrontend();
}

//Closes the Popup Window
function closePopup(){
    document.getElementById('pop-up-window').classList.add('dont-show');
}

//Saves the new Task in the backend, with values given by the input fields
async function saveNewTask(i){
    allTasks[i]['title'] = document.getElementById('title-input').value;
    allTasks[i]['category'] = document.getElementById('category-input').value;
    allTasks[i]['description'] = document.getElementById('description-input').value;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    closePopup();
    generateHeader();
    generateFrontend();
}

async function deleteTask(i){
    allTasks.splice(i,1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    closePopup();
    generateHeader();
    generateFrontend();
}

//Opens the Popup Window
function generatePopup(i){
    document.getElementById('pop-up-window').innerHTML=``;
    document.getElementById('pop-up-window').classList.remove('dont-show');
    document.getElementById('pop-up-window').innerHTML += 
    `
    <div id="pop-up-content">
        <div id="pop-up-display">
            <p><b>Titel des Tasks:</b> ${allTasks[i]['title']}</p>
            <p><b>Kategorie des Tasks:</b> ${allTasks[i]['category']}</p>
            <p><b>Beschreibung des Tasks:</b> ${allTasks[i]['description']}</p>
        </div>
        <div id="pop-up-submit">
            <input type="text" id="title-input" placeholder="Neuen Titel eingeben..">
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
function generateHeader(){
    document.getElementById('mainbody').innerHTML =
        `
        <h2>Backlog</h2>
        
        <div id="task-field">
            <div class="task-title col-4">
                <p><b>Titel</b></p>
            </div>
            <div class="task-category col-2">
                <p><b>Kategorie</b></p>
                </div>
            <div class="task-description col-5">
                <p><b>Beschreibung</b><p>
            </div>
        </div>
        `;
}