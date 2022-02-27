let tickets = [
    {
        'id': 0,
        'title': 'Einkaufen',
        'status': 'todo'
    },
    {
        'id': 1,
        'title': 'Kochen',
        'status': 'todo'
    }
]

function renderBoard() {
    document.getElementById("mainbody").innerHTML = renderBoardHTML();
    renderTickets();
}


function renderBoardHTML() {
    return `
        <div class="mainbody__container">
            <div class="row board__row">

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>TO DO</h2>
                        <div class="board__area" id="todo">


                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>IN PROGRESS</h2>
                        <div class="board__area" id="inprogress">
                            
                        </div>
                    </div>
                </div>

                <div class="board__space"></div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>TESTING</h2>
                        <div class="board__area">
                            
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-3 board__card">
                    <div class="board__section">
                        <h2>DONE</h2>
                        <div class="board__area">
                        
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}


function renderTickets() {
    for (let index = 0; index < tickets.length; index++) {
        const ticket = tickets[index];
        renderTicket(ticket);
    }
}

function renderTicket(ticket) {
    const renderTicketVar = document.getElementById(ticket.status);
    console.log(renderTicketVar);
    renderTicketVar.innerHTML += `
        <div draggable="true" class="board__button" id="${ticket.id}">${ticket.title}</div>
    `;
}