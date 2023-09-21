export { registerUser, createUser, loginUser, getPosts, createFeedContent, search };
/**
 * Register a user to the api
 * @param {string} url
 * @param {object} user
 * @example
 * registerUser("example.api", {name:example, password:abc1234, email: example@noroff.no,})
 */
async function registerUser(url, user) {
  try {
    const makeUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    let response = await fetch(url, makeUser);
    console.log(response);
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}
/**
 * function that gets login information and stores the access token to local storage
 * @param {string} url
 * @param {string} email
 * @param {string} password
 * @example
 * loginUser(exapleUrl/api/login, emailInput.value.trim(), passwordInput.value.trim());
 */
async function loginUser(url, email, password) {
  try {
    let login = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    let response = await fetch(url, login);
    let responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.accessToken != undefined) {
      localStorage.setItem("Token", responseJson.accessToken);
      location.replace("feed/index.html");
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * GET request to the api that gets posts using the accesstoken stored in local storage
 * @param {string} url
 * @example
 * getPosts(example/api/posts)
 */
async function getPosts(url) {
  try {
    let accessToken = localStorage.getItem("Token");
    let posts = {
      method: "GET",
      headers: {
        "content-type": "aplication/json",
        authorization: `Bearer ${accessToken}`,
      },
    };
    let response = await fetch(url, posts);
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}
/**
 * function that creates an object
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object}
 * @example
 * createUser("name","email","password")
 */
function createUser(name, email, password) {
  return {
    name: name,
    email: email,
    password: password,
  };
}
/**
 * function that creates html based on the object used as parameter 1, appends this html to a html element depending on paramter 2
 * @param {object} object 
 * @param {variable} section html element
 */
function createFeedContent(object, section) {
  let { title, body, created } = object;
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let h4 = document.createElement("h4");
  let p = document.createElement("p");
  h3.innerText = title;
  h4.innerText = created;
  p.innerText = body;
  div.append(h3);
  div.append(h4);
  div.append(p);
  div.classList.add("card")
  div.classList.add("m-3")
  div.classList.add("p-2")
  div.classList.add("cards")
  section.append(div);
}
/**
 * function that filter thru an array and makes a new array based on what is search on
 * @param {array} array 
 * @param {variable} searchbar html input
 * @param {variable} section  html elementent
 */
function search(array, searchbar,section) {
  let searchValue = searchbar.value.toLowerCase().trim();
  let searchResult = array.filter((search) => {
    if (search.title.toLowerCase().includes(searchValue)) {
      return true;
    }
  });
  searchResult.forEach(object => {
    createFeedContent(object, section)
  });
}
