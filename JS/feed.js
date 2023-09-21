import { getPosts, createFeedContent, search } from "././functions.js";
import { POSTS_URL,POSTS_URL_ASC } from "././variables.js";
const feedSection = document.getElementById("feed");
const searchbar = document.getElementById("search");
const filter= document.getElementById("filter")
async function displayPosts(url) {
  let arrayOfPosts = await getPosts(url);
  arrayOfPosts.forEach((object) => {
    createFeedContent(object, feedSection);
  });
  searchbar.addEventListener("keyup", () => {
    feedSection.innerHTML = " ";
    if (searchbar.value.trim().length >= 1) {
      search(arrayOfPosts, searchbar, feedSection);
    } else {
      location.reload();
    }
  });
}
displayPosts(POSTS_URL);
filter.addEventListener("change",()=>{
    if(filter.value === "oldest"){
        feedSection.innerHTML="";
        displayPosts(POSTS_URL_ASC);
    }
    else{
        location.reload()
    }
});