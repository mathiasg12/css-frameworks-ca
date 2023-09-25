import { USER_POSTS_URL, userName } from "././variables.js";
import { getPosts, createUserPost } from "././functions.js";
const sectionForposts = document.getElementById("postSection");
const h1 = document.querySelector("h1");
h1.innerText = userName;
async function displayUsersPosts(url) {
  let arrayOfPosts= await getPosts(url);
  arrayOfPosts.forEach((object)=> {
    createUserPost(object, sectionForposts)
  });
};
displayUsersPosts(USER_POSTS_URL)
