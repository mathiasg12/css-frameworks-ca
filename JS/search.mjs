export{search, crateContentFromSearch};
/**
 * function that filter thru an array and makes a new array based on what is search on
 * this search function looks in both title and body text of posts, so a user can search for both title and body text.
 * @param {array} array
 * @param {variable} searchbar, html input
 * @param {variable} section,  html elementent
 */
function search(array, searchbar) {
    let searchValue = searchbar.value.toLowerCase().trim();
    let searchResult = array.filter((search) => {
      let { body, title } = search;
      if (title.toLowerCase().includes(searchValue)) {
        return true;
      } else if (body != null) {
        if (body.toLowerCase().includes(searchValue)) {
          return true;
        }
      }
    });
    return searchResult;
  }
  /**
   * function that creates content based of an array that comes from a search function
   * @param {array} searchResult
   * @param {string variable} section
   * @param {string or variable} offset
   * @param {string or variable} perPage
   * @param {function} createhtml function that create html based on a array
   */
  function crateContentFromSearch(searchResult, section, offset, perPage,createhtml) {
    if (searchResult.length >= 1) {
      for (let i = offset; i < perPage; i++) {
        if (searchResult[i] != undefined) {
            createhtml(searchResult[i], section);
        }
      }
    } else {
      let div = document.createElement("div");
      let h1 = document.createElement("h1");
      h1.innerText = "Sorry no results";
      div.append(h1);
      div.classList.add("text-center");
      section.append(div);
    }
  }