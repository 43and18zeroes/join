setURL('http://gruppe-189.developerakademie.net/smallest_backend_ever');


function renderBacklog() {
    init();
    document.getElementById('mainbody').innerHTML =
        `
        <h2>Backlog</h2>
        <br>Wenn ihr das lesen könnt hats geklappt!
    `;
}

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}