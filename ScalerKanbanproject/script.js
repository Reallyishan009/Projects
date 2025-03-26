let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textArea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");

let colors = ["lightpink", "lightgreen", "lightblue", "black"];

let toolboxColors = document.querySelectorAll(".color");

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let addTaskFlag = false;
let removeTaskFlag = false;

let modalPriorityColor = colors[colors.length - 1];

let ticketsArr = [];

addBtn.addEventListener('click', function () {
  addTaskFlag = !addTaskFlag;

  if (addTaskFlag) {
    modalCont.style.display = 'flex';
  } else {
    modalCont.style.display = 'none';
  }
});

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove("active");
    })

    colorElem.classList.add("active");
    modalPriorityColor = colorElem.classList[0];
  });
});

modalCont.addEventListener('keydown', function (e) {
  if (e.key === "Shift") {
    let ticketContent = textAreaCont.value;
    let ticketID = shortid.generate();
    createTicket(modalPriorityColor, ticketID, ticketContent);
    modalCont.style.display = "none";
    textAreaCont.value = "";
  }
  addTaskFlag = false;
});

function createTicket(ticketColor, ticketID, ticketTask) {
  let ticket_container = document.createElement("div");
  ticket_container.classList.add("ticket-cont");

  ticket_container.innerHTML = `
        <div class="ticket-color" style="background-color: ${ticketColor}"></div>
        <div class="ticket-id">${ticketID}</div>
        <div class="task-area" contenteditable="false"> ${ticketTask}</div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>
        `
  mainCont.appendChild(ticket_container);
  handleRemoval(ticket_container);
  handleLock(ticket_container);
  handleColor(ticket_container);
}

removeBtn.addEventListener('click', function () {
  removeTaskFlag = !removeTaskFlag
  if (removeTaskFlag) {
    alert("Remove Button is Activated");
    removeBtn.style.color = "red";
  } else {
    removeBtn.style.color = "white";
  }
});

function handleRemoval(ticket) {
  ticket.addEventListener("click", function () {
    if (removeTaskFlag) {
      ticket.remove();
    }
  })
}

toolboxColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function () {
    let selectedColor = colorElem.classList[0];
    let allTickets = document.querySelectorAll(".ticket-cont");

    allTickets.forEach(function (ticket) {
      let ticketColorBand = ticket.querySelector(".ticket-color");
      let ticketColor = ticketColorBand.style.backgroundColor;
      if (ticketColor === selectedColor) {
        ticket.style.display = "block";
      } else {
        ticket.style.display = "none";
      }
    });
  });

  colorElem.addEventListener("dblclick", function () {
    let allTickets = document.querySelectorAll(".ticket-cont");
    allTickets.forEach(function (ticket) {
      ticket.style.display = "block";
    });
  });
});

function handleLock(ticket) {
  let ticketLockElem = ticket.querySelector(".ticket-lock");
  let ticketLockIcon = ticketLockElem.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");

  ticketLockIcon.addEventListener("click", function () {
    if (ticketLockIcon.classList.contains(lockClass)) {
      ticketLockIcon.classList.remove(lockClass);
      ticketLockIcon.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", true);
    } else {
      ticketLockIcon.classList.remove(unlockClass);
      ticketLockIcon.classList.add(lockClass);
      ticketTaskArea.setAttribute("contenteditable", false);
    }
  });
}

function handleColor(ticket) {
  let ticketColorBand = ticket.querySelector(".ticket-color");
  let currentColor = ticketColorBand.style.backgroundColor;
  let currentIndex = colors.indexOf(currentColor);

  ticketColorBand.addEventListener("click", function () {
    let nextIndex = (currentIndex + 1) % colors.length;
    ticketColorBand.style.backgroundColor = colors[nextIndex];
    currentIndex = nextIndex;
  });
}
