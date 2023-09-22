import { getPosts, createFeedContent, search,createPost,sendPost } from "././functions.js";
import { POSTS_URL,POSTS_URL_ASC } from "././variables.js";
const feedSection = document.getElementById("feed");
const searchbar = document.getElementById("search");
const filter= document.getElementById("filter")
const title = document.getElementById("titlePost");
const body= document.getElementById("post")
const postBTN= document.getElementById("postBtn")
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
postBTN.addEventListener("click",(clickEvent)=>{
  clickEvent.preventDefault();
if(body.value.length >= 1 && title.value.length >= 1){
  sendPost(POSTS_URL,createPost(title.value.trim(), body.value.trim()));
}
});
