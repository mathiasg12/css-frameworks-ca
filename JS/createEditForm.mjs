export{createEditForm};
/**
 * function that creates an edit form.
 * @param {variable} section
 * @param {number} id
 */
function createEditForm(section, id) {
    let form = document.createElement("form");
    let title = document.createElement("textarea");
    let bodyText = document.createElement("textarea");
    let updatePost = document.createElement("input");
    updatePost.setAttribute("type", "submit");
    title.innerText = section.querySelector("h2").innerText;
    bodyText.innerText = section.querySelector("p").innerText;
    form.classList.add("p-3");
    form.classList.add("d-flex");
    form.classList.add("flex-column");
    form.classList.add("align-items-center");
    title.classList.add("rounded-top");
    title.classList.add("border-2");
    title.classList.add("py-1");
    title.classList.add("col-12");
    title.classList.add("text-center");
    title.setAttribute("cols", 40);
    title.setAttribute("rows", 1);
    title.setAttribute("id", "title");
    bodyText.setAttribute("id", "body");
    bodyText.classList.add("rounded-bottom");
    bodyText.classList.add("border-2");
    bodyText.classList.add("py-1");
    bodyText.classList.add("col-12");
    bodyText.classList.add("text-center");
    bodyText.setAttribute("cols", 40);
    bodyText.setAttribute("rows", 5);
    updatePost.classList.add("bg-btn");
    updatePost.classList.add("m-2");
    updatePost.classList.add("update");
    updatePost.setAttribute("value", "Update");
    updatePost.dataset.updateid = id;
    updatePost.style.width = "120px";
    section.classList.add("bg-transparent");
    section.classList.remove("shadow");
    section.classList.remove("card");
    section.innerText = "";
    form.append(title);
    form.append(bodyText);
    form.append(updatePost);
    section.append(form);
  }