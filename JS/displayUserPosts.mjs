export {createUserPost};
import {formatDates}from "./functions.mjs"
/**
 * function that creates HTML for users own posts, this adds an update and delete button.
 * @param {object} object
 * @param {variable} section
 */
function createUserPost(object, section) {
    let { title, body, created, id } = object;
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let divForbtn = document.createElement("div");
    let deletebtn = document.createElement("button");
    let editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    deletebtn.innerText = "Delete";
    h2.innerText = title;
    h3.innerText = formatDates(created);
    p.innerText = body;
    div.append(h2);
    div.append(h3);
    div.append(p);
    divForbtn.append(editbtn);
    divForbtn.append(deletebtn);
    div.append(divForbtn);
    div.setAttribute("id", id);
    deletebtn.dataset.deleteid = id;
    divForbtn.classList.add("mt-3");
    divForbtn.classList.add("d-flex");
    deletebtn.classList.add("mx-2");
    deletebtn.classList.add("bg-danger");
    deletebtn.classList.add("delete");
    deletebtn.classList.add("btnCard");
    editbtn.dataset.editid = id;
    editbtn.classList.add("bg-following");
    editbtn.classList.add("edit");
    editbtn.classList.add("bg-opacity-50");
    editbtn.classList.add("mx-2");
    editbtn.classList.add("px-4");
    editbtn.classList.add("btnCard");
    deletebtn.classList.add("bg-opacity-70");
    div.classList.add("p-2");
    div.classList.add("card");
    div.classList.add("my-4");
    div.classList.add("mx-2");
    div.classList.add("cards");
    div.classList.add("shadow");
    div.classList.add("col-10");
    section.append(div);
  }