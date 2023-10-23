export {createOneItem};
import {formatDates}from "./functions.mjs"
/**
 * function that creates html based on one singular object
 * @param {object} object
 * @param {variable} section
 */
function createOneItem(object, section) {
    let { title, body, created, author } = object;
    let divContainer = document.createElement("div");
    let div = document.createElement("div");
    let imgAndDate = document.createElement("div");
    let ContainerForEmailNameDate = document.createElement("div");
    let h2AndP = document.createElement("div");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let email = document.createElement("p");
    imgAndDate.classList.add("d-flex");
    imgAndDate.classList.add("flex-wrap");
    imgAndDate.classList.add("align-items-center");
    imgAndDate.classList.add("justify-content-center");
    imgAndDate.classList.add("justify-content-sm-start");
    h2AndP.classList.add("py-3");
    h2AndP.classList.add("px-2");
    img.src = `/img/users.jpg`;
    img.classList.add("img-thumbnail");
    img.classList.add("usersImg");
    img.classList.add("rounded-circle");
    ContainerForEmailNameDate.classList.add("d-flex");
    ContainerForEmailNameDate.classList.add("flex-column");
    ContainerForEmailNameDate.classList.add("m-2");
    ContainerForEmailNameDate.classList.add("col-12");
    ContainerForEmailNameDate.classList.add("col-sm-6");
    ContainerForEmailNameDate.classList.add("align-items-center");
    ContainerForEmailNameDate.classList.add("align-items-sm-start");
    name.classList.add("my-0");
    h3.classList.add("my-1");
    email.classList.add("m-0");
    email.classList.add("mw-100");
    name.classList.add("mw-100");
    h3.classList.add("mw-100");
    h2.innerText = title;
    h3.innerText = formatDates(created);
    p.innerText = body;
    name.innerText = author.name;
    email.innerText = author.email;
    imgAndDate.append(img);
    imgAndDate.append(ContainerForEmailNameDate);
    ContainerForEmailNameDate.append(name);
    ContainerForEmailNameDate.append(email);
    ContainerForEmailNameDate.append(h3);
    h2AndP.append(h2);
    h2AndP.append(p);
    div.append(imgAndDate);
    div.append(h2AndP);
    div.classList.add("p-2");
    divContainer.append(imgAndDate);
    divContainer.append(h2AndP);
    divContainer.classList.add("p-2");
    divContainer.classList.add("card");
    divContainer.classList.add("m-3");
    divContainer.classList.add("text-decoration-none");
    divContainer.classList.add("cards");
    divContainer.classList.add("shadow");
    divContainer.classList.add("col-10");
    section.append(divContainer);
  }