"use strict";
const formEle = document.getElementById("formEle");
const inputEle = document.getElementById("inputEle");
formEle === null || formEle === void 0 ? void 0 : formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputVal = inputEle.value;
    if (inputVal == "") {
        alert("Fill the details");
    }
    else {
        let obj = {
            content: inputVal,
            status: true
        };
        console.log(obj);
        post(obj);
    }
});
function post(obj) {
    fetch('http://localhost:3004/Todo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then(r => r.json()).then(r => console.log(r)).catch(e => console.log(e));
}
const listPost = document.getElementById("listPost");
fetch('http://localhost:3004/Todo').then(r => r.json()).then((r) => { console.log(r); display(r); deleteFunc(); EditFunc(); }).catch(e => console.log(e));
const display = (todos) => {
    const container = document.getElementById("listPost");
    container.innerHTML += todos === null || todos === void 0 ? void 0 : todos.map((el, i) => {
        return `
                <li class="border-solid border-2 border-cyan-300 bg-cyan-100 w-1/4 ml-10 p-2">
                <h3>Title - ${el.content}</h3>
                <div class="flex gap-x-10">
                <p>Status - ${el.status ? "completed" : "Pending"}</p>
                <button data-id=${el.id} class="border-solid border-2 border-black p-1" id="toggle">${"Toggle"}</button>
                </div>
               
                <button data-id=${el.id} class="border-solid border-2 border-silver bg-white" id="delItem">${"Delete"}</button>
            
                </li>
                `;
    });
};
function deleteFunc() {
    const delVal = document.querySelectorAll("#delItem");
    delVal.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            fetch(`http://localhost:3004/Todo/${id}`, {
                method: "DELETE"
            }).then(res => res.json()).then(res => alert("Data Deleted")).catch(e => console.log(e));
        });
    });
}
function EditFunc() {
    const toggle = document.querySelectorAll("#toggle");
    toggle === null || toggle === void 0 ? void 0 : toggle.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            let status;
            fetch(`http://localhost:3004/Todo/${id}`).then(r => r.json()).then((r) => {
                status = r.status;
                fetch(`http://localhost:3004/Todo/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: !status })
                }).then(r => r.json()).then(r => alert("Update Successfully")).catch(e => console.log(e));
            }).catch(e => console.log(e));
        });
    });
}
console.log("Hello");
