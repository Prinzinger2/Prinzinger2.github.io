let urlList = [];

function getUrlList() {
    console.log("getUrlList() execute");
    let storedList = localStorage.getItem("storedUrlList");
    urlList = storedList ? JSON.parse(storedList) : [];
    console.log(urlList)
    console.log("getUrlList() finished");
    renderUrl()
}

function renderUrl() {
    console.log("renderUrl() execute");
    centerListBox.innerHTML = "";
    for (let i = 0; i < urlList.length; i++) {
        if (!urlList[i].saveAsPrivate) {
            const renderedList = document.createElement("li");
            renderedList.className = "list_box";
            renderedList.id = urlList[i].id;

            const renderedDisplayname = document.createElement("a");
            renderedDisplayname.textContent = urlList[i].displayname;
            renderedDisplayname.href = urlList[i].url;
            renderedDisplayname.className = "list_head";

            const listColor = document.createElement("div");
            listColor.innerText = urlList[i].previewColor;
            listColor.className = "list_desc";

            const listDeleteButton = document.createElement("button");
            listDeleteButton.innerText = "×";
            listDeleteButton.className = "list_del_btn";
            listDeleteButton.addEventListener("click", deleteItem);

            renderedList.appendChild(listDeleteButton);
            renderedList.appendChild(listColor);
            renderedList.appendChild(renderedDisplayname);
            centerListBox.appendChild(renderedList);
        }
    }
    console.log("renderUrl() finished");
}

function deleteItem(event) {
    console.log("deleteItem() execute");
    const li = event.target.closest("li");
    const itemId = li.id;
    for (let i = 0; i < urlList.length; i++) {
        if (urlList[i].id == itemId) {
            urlList.splice(i, 1,)
            break;
        }
    }
    localStorage.setItem("storedUrlList", JSON.stringify(urlList));
    renderUrl();
    console.log("deleteItem() finished");
}

function enterPasswordAndUsername() {
    console.log("enterPasswordAndUsername() execute");
    let valid = false;
    for (let i = 0; i < urlList.length; i++) {
        if (urlList[i].username === enteredUsername.value) {
            if (urlList[i].password === enteredPassword.value)
                urlList[i].saveAsPrivate = false;
            valid = true;
            renderUrl();
        }
    }
    if (!valid) {
        alert("Your Input was invalid");
    }
    console.log("enterPasswordAndUsername() finished");
}

window.addEventListener("load", getUrlList);
submit.addEventListener("click", enterPasswordAndUsername);
const enteredUsername = document.querySelector("#username");
const enteredPassword = document.querySelector("#password");