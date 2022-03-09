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

function editBacklog(i){
   generatePopup(i);
   allTasks[i]['title'] = 'hi christoph';
   backend.setItem('allTasks', JSON.stringify(allTasks))
   generateFrontend();
}

//Closes the Popup Window
function closePopup(){
    document.getElementById('pop-up-window').classList.add('dont-show');
}

//Opens the Popup Window
function generatePopup(i){
    document.getElementById('pop-up-window').innerHTML=``;
    document.getElementById('pop-up-window').classList.remove('dont-show');
    document.getElementById('pop-up-window').innerHTML += 
    `
    <div id="pop-up-content"></div>
    <img id="closebutton" src="img/xclose.ico" onclick="closePopup()">
    `
}

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