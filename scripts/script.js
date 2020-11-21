var addListButton = document.querySelector(".new-list-button");
var listHolder = document.querySelector("#main-body");

addListButton.addEventListener("click", addList);

var lists = [];

function addList(e) {
    console.log("registered");

    // append list structure to listHolder
    let list = document.createElement("div");
    list.classList.add("list-container");
    list.innerHTML = `
        <div>
            <div class="title-container">
                <button class="image-button edit-button"></button>
                <h2>My List</h2>
            </div>
            <div class="panel-holder"></div>
        </div>
        <textarea class="glow-input" placeholder="Enter new panel contents"></textarea>
    `;
    
    listHolder.appendChild(list);

    // add event listeners to parts of the list
    let textArea = list.querySelector("textarea");
    textArea.addEventListener('keypress', e => {
        if (e.key === "Enter") {
            if (textArea.value.length > 0) {
                addPanel(e);
                textArea.value = "";
            }
            e.preventDefault(); // kill to event avoid enter
        }
    })
    

    // add title edit event listener
    let titleContainer = list.querySelector(".title-container");
    let titleText = titleContainer.querySelector("h2");
    titleContainer.querySelector("button").addEventListener("click", () => activateTitleEditor(titleText));

    // edit the title
    activateTitleEditor(titleText);
    
    // append to lists array
    lists.push(list);
}

function activateTitleEditor(title) {
    titleModalBox.classList.toggle("invisible", false);
    let input = titleModalBox.querySelector("input");
    input.focus();
    input.addEventListener("keypress", function listener(e) {
        if (e.key === "Enter") {
            // change title of list
            title.innerHTML = input.value;
            input.value = "";

            // close modal box
            titleModalBox.classList.toggle("invisible", true);

            // remove event listener
            input.removeEventListener("keypress", listener);
        }
    });
}

function addPanel(e) {
    let panelHolder = e.target.closest(".list-container").querySelector(".panel-holder");

    let panel = document.createElement("div");
    panel.classList.add("panel");
    panel.innerHTML = `
        <div>
            <div>
                <button class="image-button favorite-button"></button>
                <button class="image-button edit-button"></button>
            </div>
            <button class="image-button delete-button"></button>
        </div>
        <p class="disable-select">${e.target.value}</p>
    `;
    addPanelEventListeners(panel);

    panelHolder.appendChild(panel);
}

function addPanelEventListeners(panel) {
    let deleteButton = panel.querySelector(".delete-button");
    let favoriteButton = panel.querySelector(".favorite-button");
    let editButton = panel.querySelector(".edit-button");

    deleteButton.addEventListener("click", e => {
        panel.parentNode.removeChild(panel);
    });

    favoriteButton.addEventListener("click", e => {
        throw new Error("Not Implemented");
    });

    editButton.addEventListener("click", e => {
        activatePanelEditor(panel.querySelector("p"));
    });
}

function activatePanelEditor(panelText) {
    panelModalBox.classList.toggle("invisible", false);
    let textarea = panelModalBox.querySelector("textarea");
    textarea.value = panelText.innerHTML;
    textarea.focus();
    textarea.addEventListener("keypress", function listener(e) {
        if (e.key === "Enter") {
            // change panel
            panelText.innerHTML = textarea.value;

            // close modal box
            panelModalBox.classList.toggle("invisible", true);
            // remove event listener
            input.removeEventListener("keypress", listener);
        }
    });
}
