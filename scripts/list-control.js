function addListEventListeners (list) {
    let textArea = list.querySelector("textarea");
    textArea.addEventListener('keypress', e => {
        if (e.which === 13) {
            if (textArea.value.length > 0) {
                addPanel(e);
                textArea.value = "";
            }
            e.preventDefault(); // kill to event avoid enter
        }
    })
}

function addPanel(e) {
    let panelHolder = e.target.closest(".list-container").querySelector(".panel-holder");

    let panel = document.createElement("div");
    panel.classList.add("panel");
    panel.innerHTML = `
        <div>
            <div>
                <button class="panel-button favorite-button"></button>
                <button class="panel-button edit-button"></button>
            </div>
            <button class="panel-button delete-button"></button>
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
        let text = panel.querySelector("p");
        
        text.setAttribute("contenteditable", "true");
        text.addEventListener("focusout", function listener(e) {
            text.setAttribute("contenteditable", "false");
            text.removeEventListener(listener);
        });
        text.addEventListener("keypress", function listener(e) {
            if (e.which === 13){
                text.setAttribute("contenteditable", "false");
                text.removeEventListener(listener);
            };
        })

        text.focus();
    });
}
