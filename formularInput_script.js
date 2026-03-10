let displaynameIsValid = false;
let urlIsValid = false;
let usernameIsValid = false;
let passwordIsValid = false;
let urlList = [];

function getUrlList() {
    console.log("getUrlList() execute");
    let storedList = localStorage.getItem("storedUrlList");
    urlList = storedList ? JSON.parse(storedList) : [];
    console.log(urlList)
    console.log("getUrlList() finished");
}

function onSubmitButton() {
    fetchFormData();
}

function fetchFormData() {
    const formularElement = document.querySelector("#formular");
    const formularData = new FormData(formularElement);
    console.log(formularData);
    const formularDataObject = Object.fromEntries(formularData);
    formularDataObject.id = crypto.randomUUID()
    console.log(formularDataObject);
    checkFormularData(formularDataObject);

}

function checkFormularData(formularDataObject) {
    console.log("checkFormData() execute");
    if (formularDataObject.displayname !== "") {
        console.log("displayname is valid");
        displaynameIsValid = true;
    }
    else {
        console.log("displayname is not valid");
        displaynameCheckFailed()
        return;
    }
    if (urlElement.checkValidity() == true) {
        console.log("url is valid")
        urlIsValid = true;
    }
    else {
        console.log("url is not valid");
        urlCheckFailed();
        return
    }
    if (formularDataObject.saveAsPrivate === "on") {
        console.log("saveAsPrivate is true");
        formularDataObject.saveAsPrivate = true;
        if (formularDataObject.username !== "") {
            console.log("username is valid");
            usernameIsValid = true;
            if (formularDataObject.password !== "") {
                console.log("password is valid")
                passwordIsValid = true;
                saveFormData(formularDataObject);
            }
            else {
                console.log("password is not valid");
                passwordCheckFailed()
                return;
            }
        }
        else {
            console.log("username is not valid");
            usernameCheckFailed()
            return;
        }
    }
    else {
        cutPasswordAndUsername(formularDataObject);
        saveFormData(formularDataObject);
    }
    console.log("checkFormData() finished");
}

function displaynameCheckFailed() {
    console.log("displaynameCheckFailed() execute");
    alert("PLease enter a valid Displayname");
    console.log("displaynameCheckFailed() finished");
}

function urlCheckFailed() {
    console.log("urlCheckFailed() execute");
    alert("PLease enter a valid URL");
    console.log("urlCheckFailed() finished");
}

function usernameCheckFailed() {
    console.log("usernameCheckFailed() execute");
    alert("PLease enter a valid Username");
    console.log("usernameCheckFailed() finished");
}

function passwordCheckFailed() {
    console.log("passwordCheckFailed() execute");
    alert("PLease enter a valid Password");
    console.log("passwordCheckFailed() finished");
}

function cutPasswordAndUsername(formularDataObject) {
    console.log("cutPasswordAndUsername() execute");
    delete formularDataObject.password;
    delete formularDataObject.username;
    console.log(formularDataObject);
    console.log("cutPasswordAndUsername() finished");
    return formularDataObject;
}

function saveFormData(formularDataObject) {
    console.log("saveFormData() execute");
    urlList.push(formularDataObject);
    localStorage.setItem("storedUrlList", JSON.stringify(urlList));
    console.log("saveFormData() finished");
}

const submitButton = document.querySelector("#submit_btn");
const urlElement = document.querySelector("#url");
submitButton.addEventListener("click", onSubmitButton);
window.addEventListener("load", getUrlList())
