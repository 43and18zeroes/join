function renderBoard() {
    document.getElementById("mainbody").innerHTML = '';
    document.getElementById("mainbody").innerHTML = `<div w3-include-html="board_dev/board.html"></div>`;
    includeHTML();
}