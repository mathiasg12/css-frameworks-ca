import { POSTS_URL,authorTrue} from "././variables.mjs";
import { getPosts} from "././getPosts.mjs";
import { createOneItem} from "./displayOnePost.mjs"
const querry= document.location.search;
const postSection = document.getElementById("postSection");
const idParam= new URLSearchParams(querry);
const idParmeter= idParam.get("id");
const loader= document.getElementById("loading");
const newUrl= POSTS_URL+"/"+idParmeter+authorTrue;
/**
 * async function that uses the createOneItem function which uses the getpost function as parameter,
 * this will render one post that match the id parameter used in the url. 
 */
async function displaySinglePost(){
    loader.classList.add("d-none")
    createOneItem(await getPosts(newUrl,postSection),postSection)
}
displaySinglePost();
