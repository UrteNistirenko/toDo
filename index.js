let sortByName = false;
let sortByDate = false;
let taskStatus = "active"; //status can be: active and completed

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
    status: "active",
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

// // function to read date
const formatDate = (date) => {
  const addZero = (num) => (num < 10 ? "0" + num : num);

  const h = addZero(new Date(date).getHours());
  const min = addZero(new Date(date).getMinutes());
  const s = addZero(new Date(date).getSeconds());
  const d = addZero(new Date(date).getDate());
  const mon = addZero(new Date(date).getMonth() + 1);
  const y = new Date(date).getFullYear();

  return `${h}:${min}:${s} \xa0 ${d}-${mon}-${y}`;
};

const drawTasksList = () => {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = null;

  // get data from local storage

  const lsArr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsArr ? lsArr : [];
  console.log(lsArr);

  if (sortByName) {
    arr.sort((a, b) => (a.task > b.task ? 1 : b.task > a.task ? -1 : 0));
  }

  if (sortByDate) {
    arr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  }

  // filtering active

  if (taskStatus === "active") {
    arr = arr.filter(({ status }) => status === "active");
  }

  // filtering completed
  if (taskStatus === "completed") {
    arr = arr.filter(({ status }) => status === "completed");
  }

  arr.forEach((singleTask, ind) => {
    // created elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");

    // date group
    const myDate = document.createElement("span");

    //buttons
    const btnGroup = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const completeBtn = document.createElement("button");

    //   add styles through ids
    myLi.className = "list-group-item row d-flex justify-content-between";
    myInput.className = "form-check-input me-1";
    myLabel.className = "form-check-label col-5";
    myDate.className = "col-3";

    btnGroup.className = "btn-group col-3";
    deleteBtn.className = "btn btn-outline-danger btn-sm ";
    editBtn.className = "btn btn-outline-info btn-sm";
    completeBtn.className = "btn btn-outline-success btn-sm";

    //   add other attributes

    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", ind);

    myLabel.setAttribute("for", ind);
    myLabel.textContent = singleTask.task;

    myDate.textContent = formatDate(singleTask.id);

    //btn group
    btnGroup.setAttribute("role", "group");

    //delete btn
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "Delete";

    //edit btn
    editBtn.setAttribute("type", "button");
    editBtn.textContent = "Edit";

    // completed btn
    completeBtn.setAttribute("type", "button");
    completeBtn.textContent = "Done";

    //append children
    //handle btn group append

    switch (taskStatus) {
      case "active":
        btnGroup.append(editBtn, completeBtn, deleteBtn);
        break;
      case "completed":
        btnGroup.append(deleteBtn);
        break;
      default:
        btnGroup.append(editBtn, completeBtn, deleteBtn);
        break;
    }

    myLi.append(myInput, myLabel, myDate, btnGroup);
    tasksList.append(myLi);

    //task events = delete
    deleteBtn.addEventListener("click", () => {
      console.log(lsArr);
      const filteredArr = lsArr.filter(
        (filterTask) => filterTask.id !== singleTask.id
      );
      window.localStorage.setItem("tasks", JSON.stringify(filteredArr));
      drawTasksList();
    });

    // edit button (... more on spread operator)
    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Update Your task", singleTask.task);

      if (updatedTask?.trim()) {
        const newTask = {
          ...singleTask,
          task: updatedTask,
        };

        const updatedArr = lsArr.map((task) =>
          task.id === singleTask.id ? newTask : task
        );

        window.localStorage.setItem("tasks", JSON.stringify(updatedArr));

        drawTasksList();
      }
    });

    completeBtn.addEventListener("click", () => {
      if ((singleTask.status = "active")) {
        const newTask = {
          ...singleTask,
          status: "completed",
        };

        const updatedArr = lsArr.map((task) =>
          task.id === singleTask.id ? newTask : task
        );

        window.localStorage.setItem("tasks", JSON.stringify(updatedArr));
        drawTasksList();
      }
    });
  });
};

// sort by name
document.getElementById("sortByName").addEventListener("click", function () {
  sortByName = !sortByName;

  sortByName ? this.classList.add("active") : this.classList.remove("active");
  document.getElementById("sortByDate").classList.remove("active");
  sortByDate = false;
  drawTasksList();
});
// sort by time
document.getElementById("sortByDate").addEventListener("click", function () {
  sortByDate = !sortByDate;
  sortByDate ? this.classList.add("active") : this.classList.remove("active");
  document.getElementById("sortByName").classList.remove("active");
  sortByName = false;
  drawTasksList();
});

// filtering active
document.getElementById("activeTask").addEventListener("click", function () {
  taskStatus = "active";
  document.getElementById("completedTask").classList.remove("active-nav");
  this.classList.add("active-nav");
  drawTasksList();
});

// filtering completed
document.getElementById("completedTask").addEventListener("click", function () {
  taskStatus = "completed";
  document.getElementById("activeTask").classList.remove("active-nav");
  this.classList.add("active-nav");
  drawTasksList();
});

drawTasksList();
