setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');


async function renderBacklog() {
    await init();
    document.getElementById('mainbody').innerHTML =
        `
        <h2>Backlog</h2>
        
        <div id="task-field">
            <div class="task-title">
                <p>Titel</p>
            </div>
            <div class="task-category">
                <p>Kategorie</p>
                </div>
            <div class="task-description">
                <p>Beschreibung<p>
            </div>
        </div>
        `;
    generateFrontend();
}

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}


function generateFrontend(){
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        
        document.getElementById('mainbody').innerHTML +=
        `
        <div id="task-field">
            <div class="task-title">
                <p>${element['title']}</p>
            </div>
            <div class="task-category">
                <p>${element['category']}</p>
                </div>
            <div class="task-description">
                <p>${element['description']}<p>
            </div>
        </div>

        `;
    }

}