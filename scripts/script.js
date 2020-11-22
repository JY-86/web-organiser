// ----- Class Declarations ------
class List {
    constructor (parent, title="My List", editTitleOnCreation) {
        this.title = title;
        this.panels = [];

        this.rootElem = this.generateHTML(parent);
        this.panelHolder = this.rootElem.querySelector(".panel-holder");
        this.titleContainer = this.rootElem.querySelector(".title-container");
        this.titleElem = this.titleContainer.querySelector("h2");
        this.panelEditor = this.rootElem.querySelector("textarea");

        this.addEventListeners();
        if (editTitleOnCreation) this.editTitle();
    }

    generateHTML (parentNode) {
        let list = document.createElement("div");
        list.classList.add("list-container");
        list.innerHTML = `
            <div>
                <div class="title-container">
                    <button class="image-button edit-button"></button>
                    <h2>${this.title}</h2>
                </div>
                <div class="panel-holder"></div>
            </div>
            <textarea class="glow-input" placeholder="Enter new panel contents"></textarea>
        `;
        parentNode.appendChild(list);
        return list;
    }

    addEventListeners () {
        this.panelEditor.addEventListener('keypress', e => {
            if (e.key === "Enter") {
                if (this.panelEditor.value.trim().length > 0) {
                    this.addPanel(this.panelEditor.value);
                    this.panelEditor.value = "";
                }
                e.preventDefault(); // kill event
            }
        })
        
        // add title edit event listener
        this.titleContainer.querySelector("button").addEventListener("click", e => this.editTitle());
    }

    editTitle() {
        titleModalBox.openAndEdit(this.titleElem);
    }

    addPanel (text) {
        let panel = new Panel(text, this.panelHolder);
        this.panels.push(panel);
    }
}

class Panel {
    constructor (text, parent) {
        this.favorited = false;
        this.rootElem = this.generateHTML(parent, text);
        
        this.editButton = this.rootElem.querySelector(".edit-button");
        this.favoriteButton = this.rootElem.querySelector(".favorite-button");
        this.deleteButton = this.rootElem.querySelector(".delete-button");
        this.textElem = this.rootElem.querySelector("p");

        this.addListeners();
    }

    changeFavorite (value=undefined) {
        this.favorited = value === undefined ? !this.favorited : value;
        this.favoriteButton.classList.toggle("favorited", this.favorited ? true : false);
    }

    generateHTML (parentNode, text) {
        let panel = document.createElement("div");
        panel.classList.add("panel");
        panel.innerHTML = `
            <div>
                <div>
                    <button class="image-button favorite-button hidden"></button>
                    <button class="image-button edit-button hidden"></button>
                </div>
                <button class="image-button delete-button hidden"></button>
            </div>
            <p class="disable-select">${text}</p>
        `;
        parentNode.appendChild(panel);
        return panel;
    }

    edit () {
        panelModalBox.openAndEdit(this.textElem, true);
    }

    addListeners () {
        // button click events
        this.deleteButton.addEventListener("click", e => {
            this.rootElem.parentNode.removeChild(this.rootElem);
        });
        this.favoriteButton.addEventListener("click", e => this.changeFavorite());
        this.editButton.addEventListener("click", e => this.edit());

        // mouse hover over panel
        this.rootElem.addEventListener("mouseenter", () => this.showButtons())
        this.rootElem.addEventListener("mouseleave", () => this.hideButtons())
    }

    hideButtons () {
        [this.deleteButton, this.editButton].forEach(i => 
            i.classList.toggle("hidden", true))
        if (!this.favorited) this.favoriteButton.classList.toggle("hidden", true);
    }

    showButtons () {
        [this.deleteButton, this.editButton, this.favoriteButton].forEach(i => 
            i.classList.toggle("hidden", false))
    }
}

class ModalBox {
    constructor (rootElement) {
        this.rootElem = rootElement;
    }

    open () {
        this.rootElem.classList.toggle("invisible", false);
    }

    close () {
        this.rootElem.classList.toggle("invisible", true);
    }
}

class ValueChangeBox extends ModalBox {
    constructor (rootElement, editorElementName) {
        super(rootElement);
        this.editorElementName = editorElementName;
    }

    openAndEdit (changeTarget, includeCurrentValue=false) {
        super.open();
        let input = this.rootElem.querySelector(this.editorElementName);
        input.focus();
        input.value = includeCurrentValue ? changeTarget.innerHTML : "";

        let self = this;
        input.addEventListener("keypress", function listener(e) {
            if (e.key === "Enter") {
                changeTarget.innerHTML = input.value;
                input.value = "";
    
                self.close();
                input.removeEventListener("keypress", listener);
            }
        });
    }
}

// ----- Basic Initialisation ------
var addListButton = document.querySelector(".new-list-button");
var listHolder = document.querySelector("#main-body");

addListButton.addEventListener("click", addList);

var lists = [];

const titleModalBox = new ValueChangeBox(document.querySelector(".title-box"), "input");
const panelModalBox = new ValueChangeBox(document.querySelector(".panel-box"), "textarea");

// ----- Functions ------
function addList (e) {
    lists.push(new List(listHolder, "My List", true));
}





// function activatePanelEditor(panelText) {
//     panelModalBox.classList.toggle("invisible", false);
//     let textarea = panelModalBox.querySelector("textarea");
//     textarea.value = panelText.innerHTML;
//     textarea.focus();
//     textarea.addEventListener("keypress", function listener(e) {
//         if (e.key === "Enter") {
//             // change panel
//             panelText.innerHTML = textarea.value;

//             // close modal box
//             panelModalBox.classList.toggle("invisible", true);
//             // remove event listener
//             input.removeEventListener("keypress", listener);
//         }
//     });
// }



// function addList(e) {
//     // append list structure to listHolder
//     let list = document.createElement("div");
//     list.classList.add("list-container");
//     list.innerHTML = `
//         <div>
//             <div class="title-container">
//                 <button class="image-button edit-button"></button>
//                 <h2>My List</h2>
//             </div>
//             <div class="panel-holder"></div>
//         </div>
//         <textarea class="glow-input" placeholder="Enter new panel contents"></textarea>
//     `;
    
//     listHolder.appendChild(list);

//     // add event listeners to parts of the list
//     let textArea = list.querySelector("textarea");
//     textArea.addEventListener('keypress', e => {
//         if (e.key === "Enter") {
//             if (textArea.value.length > 0) {
//                 addPanel(e);
//                 textArea.value = "";
//             }
//             e.preventDefault(); // kill to event avoid enter
//         }
//     })
    

//     // add title edit event listener
//     let titleContainer = list.querySelector(".title-container");
//     let titleText = titleContainer.querySelector("h2");
//     titleContainer.querySelector("button").addEventListener("click", () => activateTitleEditor(titleText));

//     // edit the title
//     activateTitleEditor(titleText);
    
//     // append to lists array
//     lists.push(list);
// }

// function addPanel(e) {
//     let panelHolder = e.target.closest(".list-container").querySelector(".panel-holder");

//     let panel = document.createElement("div");
//     panel.classList.add("panel");
//     panel.innerHTML = `
//         <div>
//             <div>
//                 <button class="image-button favorite-button"></button>
//                 <button class="image-button edit-button"></button>
//             </div>
//             <button class="image-button delete-button"></button>
//         </div>
//         <p class="disable-select">${e.target.value}</p>
//     `;
    
//     // button event listeners
//     let deleteButton = panel.querySelector(".delete-button");
//     let favoriteButton = panel.querySelector(".favorite-button");
//     let editButton = panel.querySelector(".edit-button");

//     deleteButton.addEventListener("click", e => {
//         panel.parentNode.removeChild(panel);
//     });

//     favoriteButton.addEventListener("click", e => {
//         throw new Error("Not Implemented");
//     });

//     editButton.addEventListener("click", e => {
//         activatePanelEditor(panel.querySelector("p"));
//     });

//     // show and hide buttons based on if mouse over panel

//     panelHolder.appendChild(panel);
// }
