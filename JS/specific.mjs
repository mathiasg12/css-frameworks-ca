import { POSTS_URL,authorTrue} from "././variables.mjs";
import { getPosts} from "././functions.mjs";
import { createOneItem} from "./displayOnePost.mjs"
const querry= document.location.search;
const postSection = document.getElementById("postSection");
const idParam= new URLSearchParams(querry);
const idParmeter= idParam.get("id");
const loader= document.getElementById("loading");
const newUrl= POSTS_URL+"/"+idParmeter+authorTrue;
async function displaySinglePost(){
    loader.classList.add("d-none")
    createOneItem(await getPosts(newUrl,postSection),postSection)
}
displaySinglePost();
