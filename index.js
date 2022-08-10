// let arr = [
//   {
//     id: 123,
//     task: "make a list",
//   },
//   {
//     id: 124,
//     task: "do dishes",
//   },
//   {
//     id: 125,
//     task: "learn js",
//   },
//   {
//     id: 126,
//     task: "make bread",
//   },
// ];

let sortByName = false;
let sortByStartTime = false;
const addTask = () => {
  const inputValue = document.getElementById("taskInput").value;
  const input = document.getElementById("taskInput");

  if (!inputValue.trim()) {
    alert("Please add a task");
    input.value = null;
    return;
  }

  const newTask = {
    id: new Date().getTime(),
    task: inputValue,
  };

  const lsArr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsArr ? lsArr : [];
  arr.push(newTask);

  window.localStorage.setItem("tasks", JSON.stringify(arr));

  input.value = null;
  drawTasksList();
};

document.getElementById("addBtn").addEventListener("click", addTask);

//draw new task on Enter
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

const drawTasksList = () => {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = null;

  // get data from local storage

  const lsArr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsArr ? lsArr : [];

  if (sortByName) {
    arr.sort((a, b) => (a.task > b.task ? 1 : b.task > a.task ? -1 : 0));
  }

  if (sortByStartTime) {
    arr.sort((b, a) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  }

  arr.forEach((value, ind) => {
    // created elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");

    //buttons
    const btnGroup = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    //   add styles through ids
    myLi.className = "list-group-item";
    myInput.className = "form-check-input me-1";
    myLabel.className = "form-check-label col-9";

    btnGroup.className = "btn-group col-2";
    deleteBtn.className = "btn bg-danger text-light btn-sm ";
    editBtn.className = "btn btn-outline-danger btn-sm";

    //   add other attributes

    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", ind);

    myLabel.setAttribute("for", ind);
    myLabel.textContent = value.task;

    //btn group
    btnGroup.setAttribute("role", "group");

    //delete btn
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "Delete";

    //edit btn
    editBtn.setAttribute("type", "button");
    editBtn.textContent = "Edit";

    //append childs
    //handle btn group append
    btnGroup.append(editBtn, deleteBtn);
    myLi.append(myInput, myLabel, btnGroup);
    tasksList.append(myLi);

    //task events = delete
    deleteBtn.addEventListener("click", () => {
      arr = arr.filter((val) => val.id !== value.id);
      window.localStorage.setItem("tasks", JSON.stringify(arr));
      drawTasksList();
    });

    // edit button (... more on spread operator)
    editBtn.addEventListener("click", () => {
      console.log(value);
      const updatedTask = prompt("Update Your task", value.task);

      if (updatedTask?.trim()) {
        console.log(updatedTask);
        const newTask = {
          ...value,
          task: updatedTask,
        };

        arr.splice(ind, 1, newTask);

        window.localStorage.setItem("tasks", JSON.stringify(arr));

        drawTasksList();
      }
    });
  });
};

drawTasksList();

// sort by name
document.getElementById("sortByName").addEventListener("click", function () {
  sortByName = !sortByName;

  sortByName ? this.classList.add("active") : this.classList.remove("active");

  drawTasksList();
});
// sort by time
document
  .getElementById("sortByStartTime")
  .addEventListener("click", function () {
    sortByStartTime = !sortByStartTime;

    sortByStartTime
      ? this.classList.add("active")
      : this.classList.remove("active");

    drawTasksList();
  });
