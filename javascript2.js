const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const clearAll = document.querySelector(".clear-btn");
// const saveEdit = document.getElementById("saveEdit");
const timeinp = document.querySelector(".timeinp");
const saveEd = document.querySelector(".saveEd");
const saveTodo = document.getElementById("saveTodo");

// saveTodo.onclick = function () {
//   saveEd.style.display = "none";
// };

let todos = JSON.parse(localStorage.getItem("todo-list"));
if (!todos) {
  todos = [];
}

let editId = "";
let chartEdit = "";

function showTodo() {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      // console.log(id, todo);
      let isCompleted = todo.status == "completed" ? "cheacked" : "";

      li += `   <li class="task" draggable="true">
        <label for="${id}">
                    <input type="checkbox" onclick = "updateStatus(this)" id="${id}" ${isCompleted}  />
                     <p class = "${isCompleted}">${todo.name} ${todo.mtime}hr</p>
        </label>
                 <div class="setting">
                 <i class="fa fa-angle-down" onclick = "showMenu(this)"></i>
          <ul class="task-menu">
                   <li onclick = "editTask(${id}, '${todo.name}', '${todo.mtime}')">  <i  class="fa fa-genderless" id = "Editbutotn"></>Edit</i></li>
                   <li onclick = "deleteTask(${id})">  <i class="fa fa-bitbucket">Delete</i></li>
          </ul>
        </div>
      </li>`;
    });
  }
  taskBox.innerHTML = li;
}
// Editbutotn.onclick = function () {
//   control.saveEd.style.disppaly = "flex";
// };

// const task = document.querySelector(".task");
// task.addEventListener("dragstart", (e) => {
//   console.log("This li element is draged");
// });
// task.addEventListener("dragend", (e) => {
//   console.log("drag end");

showTodo();
function showMenu(selectedTask) {
  //   console.log(selectedTask);
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}
function deleteTask(selectedId) {
  //   console.log(selectedId);
  todos.splice(selectedId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
  ourChart.data.labels.splice(selectedId, 1);
  ourChart.data.datasets.forEach((dataset, id) => {});
  ourChart.update();
}
clearAll.addEventListener("click", () => {
  console.log("you clicked on Clear All Button ");
  todos = "";

  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
  // const chart1 = (document.getElementById("chart1").style.display = "none");
  // ourChart.update();
});

function editTask(taskid, taskname, tasktime) {
  //   console.log(taskid, taskname);

  editId = taskid;
  console.log(editId);
  taskInput.value = taskname;
  timeinp.value = tasktime;
  chartEdit = taskid;
  const saveTodo = (document.getElementById("saveTodo").style.display = "none");
  const saveEdit = (document.getElementById("saveEdit").style.display = "flex");
}

saveEdit.addEventListener("click", () => {
  console.log("You Click here");
  todos = todos.map((todo, id) => {
    if (id === editId) {
      todo.name = taskInput.value;
      todo.mtime = timeinp.value;
    }
    return todo;
  });
  // console.log(ourChart.data.labels);
  ourChart.data.labels = ourChart.data.labels.map((label, id) => {
    if (id == chartEdit) {
      return taskInput.value;
    }
    return label;
  });

  showTodo();
  ourChart.update();
  localStorage.setItem("todo-list", JSON.stringify(todos));
  const saveEdit = (document.getElementById("saveEdit").style.display = "none");
  const saveTodo = (document.getElementById("saveTodo").style.display =
    "block");
  taskInput.value = "";
  timeinp.value = "";
});
function updateStatus(selectedTask) {
  //   console.log(selectedTask);
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id] = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id] = "panding";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

saveTodo.onclick = function () {
  let userTask = taskInput.value.trim();
  let usrtime = timeinp.value.trim();
  console.log(userTask);
  console.log(usrtime);
  if (!todos) {
    todos = [];
  }
  taskInput.value = "";
  timeinp.value = "";
  let taskInfo = { name: userTask, mtime: usrtime };
  todos.push(taskInfo);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
  ourChart.data.labels.push(userTask);
  ourChart.data.datasets.forEach((dataset) => {
    dataset.data.push(usrtime);
  });
  ourChart.update();
};

//drag and drop
let tasks = [""];
let liIdvar = "";
tasks = document.querySelectorAll(".task");
const output = document.getElementsByClassName("output");
console.log(tasks);
tasks.forEach((task, id) => {
  task.addEventListener("dragstart", (e) => {
    liIdvar = id;
    e.target.className += " hold";
    setTimeout(() => {
      e.target.className += " hide";
    }, 0);
    console.log("drag has been start");
  });
  task.addEventListener("dragend", (e) => {
    e.target.className = "task";
  });
  return id;
});

for (element of output) {
  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("drag Over");
  });

  element.addEventListener("dragenter", (e) => {
    e.preventDefault();
    console.log("drag Over");
  });

  element.addEventListener("dragleave", (e) => {
    e.preventDefault();
    console.log("drag Over");
  });

  element.addEventListener("drop", (e) => {
    e.preventDefault();
    for (var i = 0; i < tasks.length; i++) {
      if (liIdvar == i) {
        e.target.append(tasks[i]);
      }
      console.log("");
    }
  });
}

console.log(liIdvar);
