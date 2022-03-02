setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');


async function renderBacklog() {
    await init();
    document.getElementById('mainbody').innerHTML =
        `
        <h2>Backlog</h2>
        
        <div id="task-field">
            <div id="task-title">
                Titel: ${allTasks[0]['title']}
            </div>
            <div id="task-category">
                Kategorie: ${allTasks[0]['category']}
                </div>
            <div id="task-description">
                Beschreibung: ${allTasks[0]['description']}
            </div>
        </div>
        `;
}

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}


function generateFrontend(){


}