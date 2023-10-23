import { createPost, getFilterValue } from "./functions.mjs";
import { search, crateContentFromSearch } from "./search.mjs";
import { sendPost } from "./post.mjs";
import { POSTS_URL, authorTrue } from "./variables.mjs";
import { createFeedContent } from "./displayFeedContent.mjs";
import { getAllPostsInTheApi } from "./getPosts.mjs";
import { displayPosts } from "./displayPosts.mjs";
const feedSection = document.getElementById("feed");
const postSection = document.getElementById("postSection");
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
displayPosts(
  POSTS_URL + `${authorTrue}&limit=30`,
  createFeedContent,
  feedSection,
  loader
);
/**
 * eventlistener that runs if the search button or enter is pressed, it also stopps users from spamming the search symbol until they are locked out from the api.
 */
searchbar.addEventListener("keypress", (press) => {
  if (press.key === "Enter") {
    if (press.repeat) {
      press.stopPropagation();
    } else {
      searchSymbol.click();
    }
  }
});
/**
 * eventlister that runs if the search symbol is clicked, it then clears the feed seaction and loops thru the whole api,
 * then it will store the search input and use the search function to match search value with posts, then the results will be displayed in the feed section.
 */
searchSymbol.addEventListener("click", async () => {
  offset = 0;
  perPage = 30;
  searchSymbol.classList.add("pe-none");
  searchbar.disabled = true;
  loader.classList.remove("d-none");
  feedSection.innerHTML = " ";
  let allPosts = await getAllPostsInTheApi(POSTS_URL, feedSection);
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
    crateContentFromSearch(
      result,
      feedSection,
      offset,
      perPage,
      createFeedContent
    );
    loader.classList.add("d-none");
    searchbar.disabled = false;
    searched = true;
  } else {
    location.reload();
  }
});
/**
 * eventlistener that runs if the more button is pressed, this function is for searched items and will not run if searched==false, it has a local page system and
 * wil use a fucntion called createContentFromSearch to render the next posts if there are any.
 */
moreBtn.addEventListener("click", () => {
  if (searched == true) {
    offset = offset + parseInt(getFilterValue(filterPerPage));
    perPage = perPage + parseInt(getFilterValue(filterPerPage));
    if (filter.value === "newest") {
      crateContentFromSearch(
        result,
        feedSection,
        offset,
        perPage,
        createFeedContent
      );
    } else {
      crateContentFromSearch(
        reversedResult,
        feedSection,
        offset,
        perPage,
        createFeedContent
      );
    }
  }
});
/**
 * eventlistener that runs if the filter confirme button is pressed, this function is for searched items only and will not run if searched == false,
 * it will then execute the changes made, changes possible to change is upload date(newest or oldest) and results per page(30,50,100)
   @example if the user change date from newest to oldest, the array will reverse.
 */
filterConfirme.addEventListener("click", () => {
  offset = 0;
  perPage = 30;
  if (searched == true) {
    perPage = parseInt(getFilterValue(filterPerPage));
    if (filter.value === "newest") {
      feedSection.innerHTML = "";
      let length = result.length;
      let numberResults = document.createElement("p");
      numberResults.innerText = `${length} results on your search: ${searchbar.value}`;
      numberResults.classList.add("text-center");
      feedSection.append(numberResults);
      crateContentFromSearch(
        result,
        feedSection,
        offset,
        perPage,
        createFeedContent
      );
    } else {
      feedSection.innerHTML = "";
      let length = result.length;
      let numberResults = document.createElement("p");
      numberResults.innerText = `${length} results on your search: ${searchbar.value}`;
      numberResults.classList.add("text-center");
      feedSection.append(numberResults);
      crateContentFromSearch(
        reversedResult,
        feedSection,
        offset,
        perPage,
        createFeedContent
      );
    }
  }
});
/**
 * simple eventlister that allows the user to press search if the input in the search bar changes, (this is to prevent search spamming)
 */
searchbar.addEventListener("change", () => {
  searchSymbol.classList.remove("pe-none");
});
/**
 * eventlistener that runs if a user press the post button, the function will then call the sendpost function and use the input to
 * create a new post, if title or body text has less characters than 1 it will deny the post and tell the user to correct it
 */
postBTN.addEventListener("click", (clickEvent) => {
  clickEvent.preventDefault();
  if (body.value.length >= 1 && title.value.length >= 1) {
    sendPost(
      POSTS_URL,
      createPost(title.value.trim(), body.value.trim()),
      postSection
    );
  } else {
    body.placeholder = "A post needs to contain atleast one character";
    title.placeholder = "Please write a Title";
  }
});
/**
 * eventlistener that toggles the hamburger meny for filter options.
 */
filterBtn.addEventListener("click", () => {
  filterMenu.toggleAttribute("hidden");
});
/**
 * eventlistener that runs if the filter confirme button is pressed, this function only works if (searched==false),
 * it will check the value of date and reslutsPerPage and call the displayPosts function to render posts based on the users settings
 * variables the user might change is upload date (newest or oldest) and results per page(30,50,100)
 */
filterConfirme.addEventListener("click", () => {
  if (searched == false) {
    loader.classList.remove("d-none");
    let resultsPerpage = getFilterValue(filterPerPage);
    if (filter.value === "newest") {
      feedSection.innerHTML = "";
      displayPosts(
        POSTS_URL + `${authorTrue}&limit=${resultsPerpage}`,
        createFeedContent,
        feedSection,
        loader
      );
    } else {
      feedSection.innerHTML = "";
      displayPosts(
        POSTS_URL + `${authorTrue}&limit=${resultsPerpage}&&sortOrder=asc`,
        createFeedContent,
        feedSection,
        loader
      );
    }
    return (page = 0);
  }
});
/**
 * eventlistener that runs if the more button is pressed, this function only works if a user has not search anything if(searced==false),
 * the function calls the displayPosts function that renders the next set of posts, the page nr adds 1 each time a user press the more button and the offset is equal
 * to results per page * page nr, so the next 30,50 or 100 posts will render
 */
moreBtn.addEventListener("click", () => {
  if (searched == false) {
    page++;
    let resultsPerpage = getFilterValue(filterPerPage);
    if (filter.value === "newest") {
      displayPosts(
        POSTS_URL +
          `${authorTrue}&limit=${resultsPerpage}&&offset=${
            resultsPerpage * page
          }`,
        createFeedContent,
        feedSection,
        loader
      );
    } else {
      displayPosts(
        POSTS_URL +
          `${authorTrue}&limit=${resultsPerpage}&&offset=${
            resultsPerpage * page
          }&&sortOrder=asc`,
        createFeedContent,
        feedSection,
        loader
      );
    }
  }
});
