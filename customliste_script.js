const createHeadBar = document.querySelector("#creat-head_bar");
const createDescriptionBar = document.querySelector("#creat-desc_bar");
const createImportanceBar = document.querySelector("#creat-impt_bar");
const createImportanceModifierUpButton = document.querySelector("#creat-impt_mod-up_btn");
const createImportanceModifierDownButton = document.querySelector("#creat-impt_mod-down_btn");
const listCreateButton = document.querySelector("#list_creat_btn");
const centerListBox = document.querySelector("#center_list_box");

let listContent = []

function loadList() {
    if (localStorage.getItem("storedListKey") != null) {
        let storedListContent = localStorage.getItem("storedListKey");
        listContent = JSON.parse(storedListContent);

        renderList();
    }
    else {
        renderList();
    }
}

function createImportanceEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        createList();
    }
}

function createList() {
    const listHeadValue = createHeadBar.value;
    const listDescriptionValue = createDescriptionBar.value;
    let listImportanceValue = createImportanceBar.value;
    listImportanceValue = Number(listImportanceValue) || 0;
    const listItem = {
        importance: listImportanceValue,
        id: crypto.randomUUID(),
        head: listHeadValue,
        description: listDescriptionValue
    }

    updateListCreate(listItem);
    storeList();
    renderList();
}

function updateListCreate(listItem) {
    if (listContent.length == 0) {
        listContent.push(listItem);
    }
    else {
        let inserted = false;
        for (let i = 0; i < listContent.length; i++) {
            if (listItem.importance >= listContent[i].importance) {
                listContent.splice(i, 0, listItem);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            listContent.push(listItem);
        }
    }

}

function storeList() {
    let storedListContent = JSON.stringify(listContent);
    localStorage.setItem("storedListKey", storedListContent);
}

function renderList() {
    centerListBox.innerHTML = "";

    for (let i = 0; i < listContent.length; i++) {
        const renderedList = document.createElement("li");
        renderedList.className = "list_box";
        renderedList.id = listContent[i].id;

        const renderedHead = document.createElement("div");
        renderedHead.innerText = listContent[i].head;
        renderedHead.className = "list_head";

        const renderedDescription = document.createElement("div");
        renderedDescription.innerText = listContent[i].description;
        renderedDescription.className = "list_desc";

        const renderedImportance = document.createElement("input");
        renderedImportance.value = listContent[i].importance;
        renderedImportance.addEventListener("keydown", (event) => importanceEnterPress(event));
        renderedImportance.className = "list_impt_disp";

        const importanceModifierUpButton = document.createElement("button");
        importanceModifierUpButton.innerText = "△";
        importanceModifierUpButton.addEventListener("click", (event) => importanceModifierUp(event));
        importanceModifierUpButton.className = "list_impt_mod-up_btn";

        const importanceModifierDownButton = document.createElement("button");
        importanceModifierDownButton.innerText = "▽";
        importanceModifierDownButton.className = "list_impt_mod-down_btn";
        importanceModifierDownButton.addEventListener("click", (event) => importanceModifierDown(event));

        const listDeleteButton = document.createElement("button");
        listDeleteButton.innerText = "×";
        listDeleteButton.className = "list_del_btn";
        listDeleteButton.addEventListener("click", updateListDelete);

        renderedList.appendChild(renderedHead);
        renderedList.appendChild(renderedDescription);
        renderedList.appendChild(renderedImportance);
        renderedList.appendChild(listDeleteButton);
        renderedList.appendChild(importanceModifierUpButton);
        renderedList.appendChild(importanceModifierDownButton);
        centerListBox.appendChild(renderedList);
    }
}

function importanceModifierUp(event) {
    const li = event.target.closest("li");
    const itemId = li.id;
    let itemHead;
    let itemDescription;
    let itemImportance;

    for (let i = 0; i < listContent.length; i++) {
        if (listContent[i].id == itemId) {
            itemHead = listContent[i].head;
            itemDescription = listContent[i].description;
            itemImportance = listContent[i].importance;
            itemImportance++;
            listContent.splice(i, 1,);
            break;
        }
    }

    const listItem = {
        importance: itemImportance,
        id: itemId,
        head: itemHead,
        description: itemDescription
    }

    updateListCreate(listItem);
    renderList();
    storeList();
}

function importanceModifierDown(event) {
    const li = event.target.closest("li");
    const itemId = li.id;
    let itemHead;
    let itemDescription;
    let itemImportance;

    for (let i = 0; i < listContent.length; i++) {
        if (listContent[i].id == itemId) {
            itemHead = listContent[i].head;
            itemDescription = listContent[i].description;
            itemImportance = listContent[i].importance;
            itemImportance--;
            listContent.splice(i, 1,);
            break;
        }
    }

    const listItem = {
        importance: itemImportance,
        id: itemId,
        head: itemHead,
        description: itemDescription
    }

    updateListCreate(listItem);
    renderList();
    storeList();
}

function importanceEnterPress(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        updateListImportance(event);
    }
}

function updateListImportance(event) {
    const li = event.target.closest("li");
    const itemId = li.id;
    let itemHead;
    let itemDescription;
    const input = event.target.closest("input");
    const itemImportance = Number(input.value) || 0;

    for (let i = 0; i < listContent.length; i++) {
        if (listContent[i].id == itemId) {
            itemHead = listContent[i].head;
            itemDescription = listContent[i].description;
            listContent.splice(i, 1,);
            break;
        }
    }

    const listItem = {
        importance: itemImportance,
        id: itemId,
        head: itemHead,
        description: itemDescription
    }

    updateListCreate(listItem);
    renderList();
    storeList();
}

function updateListDelete(event) {
    const li = event.target.closest("li");
    const itemId = li.id;
    for (let i = 0; i < listContent.length; i++) {
        if (listContent[i].id == itemId) {
            listContent.splice(i, 1,)
            break;
        }
    }

    renderList();
    storeList();
}

listCreateButton.addEventListener("click", createList);
window.addEventListener("load", loadList);
createHeadBar.addEventListener("keydown", (event) => createImportanceEnterPress(event));
createDescriptionBar.addEventListener("keydown", (event) => createImportanceEnterPress(event));
createImportanceBar.addEventListener("keydown", (event) => createImportanceEnterPress(event));