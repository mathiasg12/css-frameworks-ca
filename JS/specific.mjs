import { POSTS_URL} from "././variables.mjs";
import { createOneItem, getPosts} from "././functions.mjs";
const querry= document.location.search;
const postSection = document.getElementById("postSection");
const idParam= new URLSearchParams(querry);
const idParmeter= idParam.get("id");
console.log(idParam)
const newUrl= POSTS_URL+"/"+idParmeter;
async function displaySinglePost(){
    createOneItem(await getPosts(newUrl),postSection)
}
displaySinglePost();
