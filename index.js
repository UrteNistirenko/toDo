let arr = [
  {
    id: 123,
    task: "make a list",
  },
  {
    id: 124,
    task: "do dishes",
  },
  {
    id: 125,
    task: "learn js",
  },
  {
    id: 126,
    task: "make bread",
  },
];
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
  arr.push(newTask);
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

    //task events
    deleteBtn.addEventListener("click", () => {
      arr = arr.filter((val) => val.id !== value.id);
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
        drawTasksList();
      }
    });
  });
};

drawTasksList();
