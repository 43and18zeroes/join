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
function generateFrontend() {
    document.getElementById('mainbody').innerHTML = ``;
    generateHeader();
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        const profileID = element['user']-1;
        //const category is important for the addColor function
        const category = allTasks[i]['category'];
        document.getElementById('mainbody').innerHTML +=
        `
        <div id="task-field">
            <div id="left-card-color${i}" class="task-title col-4 card-design-left">
                <p>${profiles[profileID]['name']} ${profiles[profileID]['email']}</p>
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
        addColor(i,category);
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
    allTasks[i]['user'] = +document.getElementById('popup-select').value;
    allTasks[i]['category'] = document.getElementById('popup-category').value;
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
    const element = allTasks[i];
    const profileID = element['user']-1;
    document.getElementById('pop-up-window').innerHTML +=
        `
    <div id="pop-up-content">
        <div id="pop-up-display">
            <p><b>Currently assigned to:</b> ${profiles[profileID]['name']} ${profiles[profileID]['email']}</p>
            <p><b>Current category:</b> ${allTasks[i]['category']}</p>
            <p><b>Current details:</b> ${allTasks[i]['description']}</p>
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
            <textarea id="description-input" placeholder="Add a new description.."></textarea>
            <button id="save-task-button" onclick="saveNewTask(${i})">Task speichern</button>
            <button id="delete-task-button" onclick="deleteTask(${i})">Task Löschen!</button>
        </div>
    </div>
    <img id="closebutton" src="img/xclose.ico" onclick="closePopup(${i})">
    `
    popupPreset(i);
}

//Set the popup selection fields to value of the current task
function popupPreset(i){
    document.getElementById('popup-select').value = `${allTasks[i]['user']}`;
    document.getElementById('popup-category').value = `${allTasks[i]['category']}`;
    document.getElementById('description-input').innerHTML = `${allTasks[i]['description']}`;
}

//Adds the color accent to each task card
function addColor(i, category){
    document.getElementById(`left-card-color${i}`).classList.add(`color_${category}`);
    console.log(`color_${category}`);
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