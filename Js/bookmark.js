var bookmarkName = document.getElementById("bookmark_Name")
var WebsiteUrl = document.getElementById("Website_Url")
var vaildtext = document.getElementById("vaildtext")
var vaildName = document.getElementById("vaildName")
var overlay = document.getElementById("overlay")


var arrayofBookmark = [];

if (localStorage.getItem("allBookmark") != null) {
    arrayofBookmark = JSON.parse(localStorage.getItem("allBookmark"))
    read()
}


function validUrl() {

    var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/

    if (regex.test(WebsiteUrl.value)) {
        return true

    }


    vaildtext.classList.replace("d-none", "d-block")
    overlay.classList.replace("d-none", "d-block")



    return false

}


function validName() {

    var regex = /^([a-z]|[A-Z]){3,}$/

    if (regex.test(bookmarkName.value)) {
        return true
    }

    vaildtext.classList.replace("d-none", "d-block")
    overlay.classList.replace("d-none", "d-block")

    return false



}

function closeErrorAlert() {
    vaildtext.classList.replace("d-block", "d-none")
    vaildName.classList.replace("d-block", "d-none")
    overlay.classList.replace("d-block", "d-none")
}


function addBookMark() {
    if (validUrl() == true && validName() == true) {

        var newBookmark = {
            name: bookmarkName.value,
            url: WebsiteUrl.value,

        }


        var nameRepeat = bookmarkName.value.trim().toLowerCase()

        var isDuplicate = arrayofBookmark.some(bookmark =>
            bookmark.name.trim().toLowerCase() === nameRepeat
        );

        if (isDuplicate) {
            vaildName.classList.replace("d-none", "d-block")
            overlay.classList.replace("d-none", "d-block")

            return;
        } else {
            arrayofBookmark.push(newBookmark);

        }

        localStorage.setItem("allBookmark", JSON.stringify(arrayofBookmark))

        clear()
        read()
    }



}


function read() {

    var bookMark = " "

    for (var i = 0; i < arrayofBookmark.length; i++) {
        bookMark +=
            `<tr> 
             <td>${i + 1}</td>
             <td>${arrayofBookmark[i].name}</td>
             <td><a href="${arrayofBookmark[i].url}" target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye"></i> visit</button></a></td>
             <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
             </tr>
    `
    }



    localStorage.getItem("bookmark", JSON.stringify(arrayofBookmark))

    document.getElementById("tableBody").innerHTML = bookMark



}


function clear() {
    bookmarkName.value = ""
    WebsiteUrl.value = ""

}

function deleteBookmark(index) {
    arrayofBookmark.splice(index, 1)
    localStorage.setItem("allBookmark", JSON.stringify(arrayofBookmark))
    read()

}