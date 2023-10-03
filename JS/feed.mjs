import { getPosts, createFeedContent, search,createPost,sendPost,} from "./functions.mjs";
import { POSTS_URL,authorTrue} from "./variables.mjs";
const feedSection = document.getElementById("feed");
const searchbar = document.getElementById("search");
const filter= document.getElementById("filter")
const title = document.getElementById("titlePost");
const body= document.getElementById("post")
const postBTN= document.getElementById("postBtn")
const filterBtn= document.getElementById("filterBtn")
const filterMenu= document.getElementById("hiddenFilter")
const filterConfirme= document.getElementById("filterConfirme")
const filterPerPage= document.querySelectorAll(".perPage")
const moreBtn= document.getElementById("moreBtn");
const loader= document.getElementById("loading");
let page=0;
async function displayPosts(url) {
  let arrayOfPosts = await getPosts(url);
  loader.classList.add("d-none")
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
displayPosts(POSTS_URL+authorTrue);
postBTN.addEventListener("click",(clickEvent)=>{
  clickEvent.preventDefault();
if(body.value.length >= 1 && title.value.length >= 1){
  sendPost(POSTS_URL,createPost(title.value.trim(), body.value.trim()));
}
});
filterBtn.addEventListener("click",()=>{
 filterMenu.toggleAttribute("hidden")
})
filterConfirme.addEventListener("click",()=>{
  loader.classList.remove("d-none")
  for(let i=0; i<filterPerPage.length; i++){
    if(filterPerPage[i].checked){
      let resultsPerpage= filterPerPage[i].value
      if(filter.value=== "newest"){
        feedSection.innerHTML=""
        displayPosts(POSTS_URL+`${authorTrue}&limit=${resultsPerpage}`);
      }
      else{
        feedSection.innerHTML=""
        displayPosts(POSTS_URL+`${authorTrue}&limit=${resultsPerpage}&&sortOrder=asc`)
      }
      }
  }
  return page=0;
})
moreBtn.addEventListener("click",()=>{
  page ++;
  for(let i=0; i<filterPerPage.length; i++){
    if(filterPerPage[i].checked){
      let resultsPerpage= filterPerPage[i].value
      if(filter.value=== "newest"){
        displayPosts(POSTS_URL+`${authorTrue}&limit=${resultsPerpage}&&offset=${resultsPerpage*page}`);
      }
      else{
        displayPosts(POSTS_URL+`${authorTrue}&limit=${resultsPerpage}&&offset=${resultsPerpage*page}&&sortOrder=asc`)
      }
      }
  }
})



