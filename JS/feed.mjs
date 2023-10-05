import {
  getPosts,
  createFeedContent,
  search,
  crateContentFromSearch,
  createPost,
  sendPost,
  getAllPostsInTheApi,
} from "./functions.mjs";
import { POSTS_URL, authorTrue } from "./variables.mjs";
const feedSection = document.getElementById("feed");
const searchbar = document.getElementById("search");
const searchSymbol = document.getElementById("searchSymbol");
const filter = document.getElementById("filter");
const title = document.getElementById("titlePost");
const body = document.getElementById("post");
const postBTN = document.getElementById("postBtn");
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("hiddenFilter");
const filterConfirme = document.getElementById("filterConfirme");
const filterPerPage = document.querySelectorAll(".perPage");
const moreBtn = document.getElementById("moreBtn");
const loader = document.getElementById("loading");
let page = 0;
let searched = false;
let offset = 0;
let perPage = 30;
let result = [];
let reversedResult = [];
async function displayPosts(url) {
  let arrayOfPosts = await getPosts(url);
  loader.classList.add("d-none");
  arrayOfPosts.forEach((object) => {
    createFeedContent(object, feedSection);
  });
}
displayPosts(POSTS_URL + `${authorTrue}&limit=30`);
searchbar.addEventListener("keypress", (press) => {
  if (press.key === "Enter") {
    if (press.repeat) {
      press.stopPropagation();
    } else {
      searchSymbol.click();
    }
  }
});
searchSymbol.addEventListener("click", async () => {
  offset = 0;
  perPage = 30;
  searchSymbol.classList.add("pe-none");
  searchbar.disabled = true;
  loader.classList.remove("d-none");
  feedSection.innerHTML = " ";
  let allPosts = await getAllPostsInTheApi(POSTS_URL);
  if (searchbar.value.trim().length >= 1) {
    result = search(allPosts, searchbar);
    reversedResult = result.toReversed();
    let length = result.length;
    let numberResults = document.createElement("p");
    numberResults.innerText = `${length} results on your search: ${searchbar.value}`;
    numberResults.classList.add("text-center");
    feedSection.append(numberResults);
    filter.value = "newest";
    filterPerPage[0].checked = true;
    crateContentFromSearch(result, feedSection, offset, perPage);
    loader.classList.add("d-none");
    searchbar.disabled = false;
    searched = true;
  } else {
    location.reload();
  }
});
moreBtn.addEventListener("click", () => {
  if (searched == true) {
    offset = offset + parseInt(getFilterValue());
    perPage = perPage + parseInt(getFilterValue());
    console.log("offset:" + offset);
    console.log("perpage:" + perPage);
    if (filter.value === "newest") {
      crateContentFromSearch(result, feedSection, offset, perPage);
    } else {
      crateContentFromSearch(reversedResult, feedSection, offset, perPage);
    }
  }
});
filterConfirme.addEventListener("click", () => {
  offset = 0;
  perPage = 30;
  if (searched == true) {
    perPage = parseInt(getFilterValue());
    if (filter.value === "newest") {
      feedSection.innerHTML = "";
      let length = result.length;
      let numberResults = document.createElement("p");
      numberResults.innerText = `${length} results on your search: ${searchbar.value}`;
      numberResults.classList.add("text-center");
      feedSection.append(numberResults);
      crateContentFromSearch(result, feedSection, offset, perPage);
    } else {
      feedSection.innerHTML = "";
      let length = result.length;
      let numberResults = document.createElement("p");
      numberResults.innerText = `${length} results on your search: ${searchbar.value}`;
      numberResults.classList.add("text-center");
      feedSection.append(numberResults);
      crateContentFromSearch(reversedResult, feedSection, offset, perPage);
    }
  }
});
searchbar.addEventListener("change", () => {
  searchSymbol.classList.remove("pe-none");
});
postBTN.addEventListener("click", (clickEvent) => {
  clickEvent.preventDefault();
  if (body.value.length >= 1 && title.value.length >= 1) {
    sendPost(POSTS_URL, createPost(title.value.trim(), body.value.trim()));
  } else {
    body.placeholder = "A post needs to contain atleast one character";
    title.placeholder = "Please write a Title";
  }
});
filterBtn.addEventListener("click", () => {
  filterMenu.toggleAttribute("hidden");
});
/**
 * function that gets the value of the radio buttons depending on which one that is checked
 * @returns string
 */
function getFilterValue() {
  if (filterPerPage[0].checked) {
    return filterPerPage[0].value;
  } else if (filterPerPage[1].checked) {
    return filterPerPage[1].value;
  } else {
    return filterPerPage[2].value;
  }
}
filterConfirme.addEventListener("click", () => {
  if (searched == false) {
    loader.classList.remove("d-none");
    let resultsPerpage = getFilterValue();
    if (filter.value === "newest") {
      feedSection.innerHTML = "";
      displayPosts(POSTS_URL + `${authorTrue}&limit=${resultsPerpage}`);
    } else {
      feedSection.innerHTML = "";
      displayPosts(
        POSTS_URL + `${authorTrue}&limit=${resultsPerpage}&&sortOrder=asc`
      );
    }
    return (page = 0);
  }
});
moreBtn.addEventListener("click", () => {
  if (searched == false) {
    page++;
    let resultsPerpage = getFilterValue();
    if (filter.value === "newest") {
      displayPosts(
        POSTS_URL +
          `${authorTrue}&limit=${resultsPerpage}&&offset=${
            resultsPerpage * page
          }`
      );
    } else {
      displayPosts(
        POSTS_URL +
          `${authorTrue}&limit=${resultsPerpage}&&offset=${
            resultsPerpage * page
          }&&sortOrder=asc`
      );
    }
  }
});
