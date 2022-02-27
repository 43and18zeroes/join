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
    document.getElementById("mainbody").innerHTML = '';
    document.getElementById("mainbody").innerHTML = `<div w3-include-html="board_dev/board.html"></div>`;
    includeHTML();
    renderTickets()
}


function renderTickets() {
    for (let index = 0; index < tickets.length; index++) {
        const ticket = tickets[index];
        renderTicket(ticket);
    }
}

function renderTicket(ticket) {
    const ticketStatus = ticket.status;
    const renderTicketVar = document.getElementById("'" + ticketStatus + "'");
    console.log(renderTicketVar);
    renderTicketVar.innerHTML += `
        <div draggable="true" class="board__button">Einkaufen</div>
        `;
}