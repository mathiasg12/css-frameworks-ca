import { POSTS_URL,authorTrue} from "././variables.mjs";
import { createOneItem, getPosts} from "././functions.mjs";
const querry= document.location.search;
const postSection = document.getElementById("postSection");
const idParam= new URLSearchParams(querry);
const idParmeter= idParam.get("id");
const loader= document.getElementById("loading");
console.log(idParam)
const newUrl= POSTS_URL+"/"+idParmeter+authorTrue;
async function displaySinglePost(){
    loader.classList.add("d-none")
    createOneItem(await getPosts(newUrl),postSection)
}
displaySinglePost();
