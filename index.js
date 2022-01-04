// updating when getting refreshed

show();
let addbtn = document.getElementById("add");
let delbtn = document.getElementById("del");
let input = document.getElementById("input");

// add to localstorage on button click

addbtn.addEventListener('click', function () {
    let value = input.value;
    if (value != "") {
        let webtask = localStorage.getItem("key");
        if (webtask == null) {
            array = [];
        }
        else {
            array = JSON.parse(webtask);
        }
        array.unshift(value);
        localStorage.setItem("key", JSON.stringify(array))
    }
    input.value = "";
    show();

})
// adding text on pressing on enter
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addbtn.click();
    }

})

// updating the list on the screen

function show() {
    let webtask = localStorage.getItem("key");
    if (webtask == null) {
        array = [];
    }
    else {
        array = JSON.parse(webtask);
    }

    let html = '';
    let mainlist = document.getElementById("list");
    array.forEach((ele, index) => {
        html += ` <li>
        <span class="index">${index + 1}</span>
        <span class="ele">${ele}</span>
        <span><button class="edit" onclick="edittask(${index})">edit</button></span>
        <span><button class="dele" onclick="deleteitem(${index})">delete</button></span>
    </li>`;
    });
    mainlist.innerHTML = html;

}

// edit function start here

function edittask(index) {
    let webtask = localStorage.getItem("key");
    let savebtn = document.getElementById("save");
    let saveindex = document.getElementById("saveindex");
    saveindex.value = index;
    if (webtask == null) {
        array = [];
    }
    else {
        array = JSON.parse(webtask);
    }
    input.value = array[index]
    addbtn.style.display = "none";
    savebtn.style.display = "inline";

}

// save function starts here
let savebtn = document.getElementById("save");

savebtn.addEventListener("click", function () {
    let saveindex = document.getElementById("saveindex").value;
    let webtask = localStorage.getItem("key");
    array = JSON.parse(webtask);
    array[saveindex] = input.value;
    localStorage.setItem("key", JSON.stringify(array))
    input.value = "";
    savebtn.style.display = "none";
    addbtn.style.display = "inline";
    show();

})


// delete function from here
function deleteitem(index) {
    let webtask = localStorage.getItem("key");
    array = JSON.parse(webtask);
    array.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(array))
    show();
}

// delete all

let delall = document.getElementById("del");
delall.addEventListener("click", function () {
    let webtask = localStorage.getItem("key");
    array = JSON.parse(webtask);
    array = [];
    localStorage.setItem("key", JSON.stringify(array))
    savebtn.style.display = "none";
    addbtn.style.display = "inline";
    show();
})


// searching function starts here

function myinput() {
    let search = document.getElementById("search").value.toUpperCase();
    let mainlist = document.getElementById("list");
    let list = mainlist.querySelectorAll("li");
    console.log(search)

 list.forEach((item,index) => {
        let a = list[index].querySelectorAll("span")[1].innerText.toUpperCase();
        if (a.indexOf(search)>-1) {
             list[index].style.display = '';
        } else {
             list[index].style.display = "none";
        }
})
}
