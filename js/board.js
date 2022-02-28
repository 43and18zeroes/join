let tickets = [
    {
        'id': 0,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 1,
        'title': 'Putzen',
        'status': 'inprogress'
    },
    {
        'id': 2,
        'title': 'Kochen',
        'status': 'inprogress'
    },
    {
        'id': 3,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 4,
        'title': 'Putzen',
        'status': 'todo'
    },
    {
        'id': 5,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 6,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 7,
        'title': 'Putzen',
        'status': 'todo'
    },
    {
        'id': 8,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 9,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 10,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 11,
        'title': 'Putzen',
        'status': 'todo'
    },
    {
        'id': 12,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 13,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 14,
        'title': 'Putzen',
        'status': 'todo'
    },
    {
        'id': 15,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 16,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 17,
        'title': 'Putzen',
        'status': 'todo'
    },
    {
        'id': 18,
        'title': 'Kochen',
        'status': 'todo'
    },
    {
        'id': 19,
        'title': 'Kochen',
        'status': 'todo'
    }
]

let currentDraggedElement;


function renderBoard() {
    document.getElementById("mainbody").innerHTML = renderBoardHTML();
    updateHTML();
}


function renderBoardHTML() {
    return `
        <div class="mainbody__container">
            <div class="row board__row">

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>TO DO</h2>
                        <div class="board__area" id="todo" ondrop="moveTo('todo'); removeHighlight('todo')" ondragleave="removeHighlight('todo')" ondragover="allowDrop(event); highlight('todo')">
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>IN PROGRESS</h2>
                        <div class="board__area" id="inprogress" ondrop="moveTo('inprogress'); removeHighlight('inprogress')" ondragleave="removeHighlight('inprogress')" ondragover="allowDrop(event); highlight('inprogress')">
                        </div>
                    </div>
                </div>

                <div class="board__space"></div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>TESTING</h2>
                        <div class="board__area" id="testing" ondrop="moveTo('testing'); removeHighlight('testing')" ondragleave="removeHighlight('testing')" ondragover="allowDrop(event); highlight('testing')">
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>DONE</h2>
                        <div class="board__area" id="done" ondrop="moveTo('done'); removeHighlight('done')" ondragleave="removeHighlight('done')" ondragover="allowDrop(event); highlight('done')">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}


// function renderTickets() {
//     for (let index = 0; index < tickets.length; index++) {
//         const ticket = tickets[index];
//         renderTicket(ticket);
//     }
// }

// /**
//  * This function renders a single ticket into the board
//  * 
//  * @param {JSON} ticket - JSON with data of a single ticket
//  */
// function renderTicket(ticket) {
//     document.getElementById(ticket.status).innerHTML += `
//         <div draggable="true" class="board__button" id="${ticket.id}">${ticket.title}</div>
//     `;
// }


/* Drag and Drop Video */


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


function moveTo(status) {
    tickets[currentDraggedElement]['status'] = status; // i.E. ticket with id 1: the category array changes to 'todo' or 'inprogress'
    updateHTML();
}


function highlight(id) {
    document.getElementById(id).classList.add('drag__area__highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag__area__highlight');
}