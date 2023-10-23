import { USER_POSTS_URL, userName, POSTS_URL } from "././variables.mjs";
import {
  getPosts,
  createPost,
} from "././functions.mjs";
import{
  createUserPost
} from"./displayUserPosts.mjs";
import{  createEditForm} from "././createEditForm.mjs";
import { deletePost, updatePost } from "././deleteAndUdate.mjs";
const logOut = document.getElementById("logOut");
const sectionForposts = document.getElementById("postSection");
const h2 = document.querySelector("#name");
const loader = document.getElementById("loading");
h2.innerText = userName;
async function displayUsersPosts(url) {
  let arrayOfPosts = await getPosts(url, sectionForposts);
  loader.classList.add("d-none");
  arrayOfPosts.forEach((object) => {
    createUserPost(object, sectionForposts);
  });
}
displayUsersPosts(USER_POSTS_URL);
sectionForposts.addEventListener("click", (click) => {
  if (click.target.classList.contains("delete")) {
    let id = click.target.dataset.deleteid;
    deletePost(POSTS_URL + `/${id}`, sectionForposts);
  }
});
sectionForposts.addEventListener("click", (click) => {
  if (click.target.classList.contains("edit")) {
    let id = click.target.dataset.editid;
    let postToBeEdited = document.getElementById(id);
    createEditForm(postToBeEdited, id);
  }
});
/**
 * event listener that runs if the "click" contains a class called update,
 * then it checks if both "title" and "bodytext" contains more that 0 characters, if so it will call the updatePost function.
 * the updatePost function use the api url as one parameter and another function called createPost as the second.
 */
sectionForposts.addEventListener("click", (click) => {
  if (click.target.classList.contains("update")) {
    click.preventDefault();
    let id = click.target.dataset.updateid;
    let title = document.getElementById("title");
    let bodyText = document.getElementById("body");
    if (bodyText.value.length < 1 && title.value.length < 1) {
      bodyText.classList.add("border-danger");
      bodyText.setAttribute(
        "placeholder",
        "Post needs to be more than 0 characters"
      );
      title.classList.add("border-danger");
      title.setAttribute(
        "placeholder",
        "Title needs to be more than 0 characters"
      );
    } else if (title.value.length < 1) {
      title.classList.add("border-danger");
      title.setAttribute(
        "placeholder",
        "Title needs to be more than 0 characters"
      );
      bodyText.classList.remove("border-danger");
    } else if (bodyText.value.length < 1) {
      bodyText.classList.add("border-danger");
      bodyText.setAttribute(
        "placeholder",
        "Post needs to be more than 0 characters"
      );
      title.classList.remove("border-danger");
    } else {
      updatePost(
        POSTS_URL + `/${id}`,
        createPost(title.value, bodyText.value),
        sectionForposts
      );
      title.classList.remove("border-danger");
      bodyText.classList.remove("border-danger");
    }
  }
});
logOut.addEventListener("click", () => {
  localStorage.clear();
  location.replace("../index.html");
});
