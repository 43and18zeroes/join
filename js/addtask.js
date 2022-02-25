function renderAddTask() {
  document.getElementById('mainbody').innerHTML = '';
  document.getElementById('mainbody').innerHTML = `
  <header>
    <h2>All Tasks</h2>
    <span class="smallText">Learning Management System Project</span>
  </header>

  <form id="form" class="form">
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Management meeting preparation">
    </div>

    <div class="form-control">
      <label for="date">Due Date</label>
      <input type="text" id="date" placeholder="02/07/20">
    
    </div>

    <div class="form-control">
      <label for="category">Category</label>
      <input type="text" id="category" placeholder="Management">
    </div>

    <div class="form-control">
      <label for="urgency">Urgency</label>
      <input type="text" id="urgency" placeholder="High">
    </div>

    <div class="form-control">
      <label for="description"></label>
      <input type="text" id="description" placeholder="Task description">
    </div>

    <div class="form-control">
      <label for="assignedTo">Assigned To</label>
      
    </div>

  </form>
 `;
}