var addListButton = document.querySelector(".new-list-button");
var listHolder = document.querySelector("#main-body");

addListButton.addEventListener("click", addList);

var lists = [];

function addList(e) {
    console.log("registered");
    debugger;
    // append list structure to listHolder
    let list = document.createElement("div");
    list.classList.add("list-container");
    list.innerHTML = `
        <div>
            <h2 contenteditable="true"></h2>
            <div class="panel-holder"></div>
        </div>
        <textarea class="list-input" placeholder="Enter new panel contents"></textarea>
    `;
    
    listHolder.appendChild(list);

    // add events to list items
    addListEventListeners(list);
    
    // focus title (make it editable)
    list.querySelector("h2").focus();
    
    // append to lists array
    lists.push(list);
}
