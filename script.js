function addTask() {
    var input = document.getElementById('taskInput');
    var newTask = input.value;
    if (newTask) {
        var li = document.createElement('li');
        li.textContent = newTask;
        li.onclick = function() {
            this.parentNode.removeChild(this);
        }
        document.getElementById('taskList').appendChild(li);
        input.value = ''; // clear input
    }
}
