export {
  registerUser,
  createUser,
  loginUser,
  getPosts,
  createFeedContent,
  search,
  sendPost,
  createPost,
  createOneItem,
  createUserPost,
  deletePost,
  updatePost,
  createEditForm,
  emailValidation,
  validateLength,
  passwordsAreEquel,
  formatDates,
  getAllPostsInTheApi,
};
/**
 * Register a user to the api
 * @param {string} url
 * @param {string} login url
 * @param {object} user
 * @param {variable} email
 * @param {variable} password
 * @param {variable} h3
 * @example
 * registerUser("example.api/register","example.api/login", {name:example, password:abc1234, email: example@noroff.no,},username,email,h3)
 */
async function registerUser(url, urlLogin, user, email, password, h3) {
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
    if (response.status !== 400) {
      h3.innerText = "Sign up";
      h3.classList.remove("text-danger");
      await loginUser(urlLogin, email, password);
    } else {
      h3.innerText = responseJson.errors[0].message;
      h3.classList.add("text-danger");
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * function that gets login information and stores the access token to local storage
 * @param {string} url
 * @param {variable} email
 * @param {variable} password
 * @param {variable} h3
 * @example
 * loginUser(exapleUrl/api/login, emailInput.value.trim(), passwordInput.value.trim(),h3);
 */
async function loginUser(url, email, password, h3) {
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
    if (response.status !== 401) {
      if (responseJson.accessToken != undefined) {
        if (h3 != undefined) {
          h3.innerText = "Login";
          h3.classList.remove("text-danger");
          localStorage.setItem("Token", responseJson.accessToken);
          localStorage.setItem("name", responseJson.name);
          location.replace("feed/index.html");
        } else {
          localStorage.setItem("Token", responseJson.accessToken);
          localStorage.setItem("name", responseJson.name);
          location.replace("feed/index.html");
        }
      }
    } else {
      h3.innerText = responseJson.errors[0].message;
      h3.classList.add("text-danger");
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
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}
/**
 * GET request to the api that gets posts using the accesstoken stored in local storage,
 * and stores all posts in an array
 * @param {string} url
 * @returns array
 */
async function getAllPostsInTheApi(url) {
  try {
    let accessToken = localStorage.getItem("Token");
    let posts = {
      method: "GET",
      headers: {
        "content-type": "aplication/json",
        authorization: `Bearer ${accessToken}`,
      },
    };
    let offset = 100;
    let arrayWithAllPosts = [];
    let page = 1;
    for (let i = 0; i < page; i++) {
      page++;
      let response = await fetch(
        url + `?_author=true&offset=${offset * [i]}`,
        posts
      );
      let responseJson = await response.json();
      if (responseJson.length >= 1) {
        arrayWithAllPosts.push(responseJson);
      } else {
        let flatArrayWithALlPosts = arrayWithAllPosts.flatMap((object) => {
          return object;
        });
        console.log(flatArrayWithALlPosts);
        return flatArrayWithALlPosts;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 *  function that sends a post(object) to the api
 * @param {string} url
 * @param {object} object
 */
async function sendPost(url, object) {
  try {
    let accessToken = localStorage.getItem("Token");
    let sendTo = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(object),
    };
    let response = await fetch(url, sendTo);
    location.reload();
    return response;
  } catch (error) {
    console.log(error);
  }
}
/**
 * function that lets users delete a post
 * @param {string} url
 */
async function deletePost(url) {
  try {
    let accessToken = localStorage.getItem("Token");
    let deleteThis = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    };
    await fetch(url, deleteThis);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
/**
 * function that sends a PUT request to update a post in the api, takes to parameters the Url to the api and a object that gets stored.
 * @param {string} url
 * @param {object} object
 */
async function updatePost(url, object) {
  try {
    let accessToken = localStorage.getItem("Token");
    let updateThis = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(object),
    };
    await fetch(url, updateThis);
    location.reload();
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
 * function that creates a object
 * @param {string} title
 * @param {string} body
 * @returns
 */
function createPost(title, body) {
  return {
    title: title,
    body: body,
  };
}
function formatDates(timeToFormat) {
  let timeFormat = new Date(timeToFormat).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour24: "true",
  });
  return timeFormat;
}

/**
 * function that creates html based on the object used as parameter 1, appends this html to a html element depending on paramter 2
 * @param {object} object
 * @param {variable} section html element
 */
function createFeedContent(object, section) {
  let { title, body, created, author } = object;
  let a = document.createElement("a");
  let div = document.createElement("div");
  let imgAndDate = document.createElement("div");
  let ContainerForEmailNameDate = document.createElement("div");
  let h2AndP = document.createElement("div");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let img = document.createElement("img");
  let name = document.createElement("p");
  let email = document.createElement("p");
  imgAndDate.classList.add("d-flex");
  imgAndDate.classList.add("flex-wrap");
  imgAndDate.classList.add("align-items-center");
  imgAndDate.classList.add("justify-content-center");
  imgAndDate.classList.add("justify-content-sm-start");
  h2AndP.classList.add("py-3");
  h2AndP.classList.add("px-2");
  img.src = `/img/users.jpg`;
  img.classList.add("img-thumbnail");
  img.classList.add("usersImg");
  img.classList.add("rounded-circle");
  ContainerForEmailNameDate.classList.add("d-flex");
  ContainerForEmailNameDate.classList.add("flex-column");
  ContainerForEmailNameDate.classList.add("m-2");
  ContainerForEmailNameDate.classList.add("col-12");
  ContainerForEmailNameDate.classList.add("col-sm-6");
  ContainerForEmailNameDate.classList.add("align-items-center");
  ContainerForEmailNameDate.classList.add("align-items-sm-start");
  name.classList.add("my-0");
  h3.classList.add("my-1");
  email.classList.add("m-0");
  email.classList.add("mw-100");
  name.classList.add("mw-100");
  h3.classList.add("mw-100");
  h2.innerText = title;
  h3.innerText = formatDates(created);
  p.innerText = body;
  name.innerText = author.name;
  email.innerText = author.email;
  a.append(div);
  a.href = `../specific/index.html?id=${object.id}`;
  imgAndDate.append(img);
  imgAndDate.append(ContainerForEmailNameDate);
  ContainerForEmailNameDate.append(name);
  ContainerForEmailNameDate.append(email);
  ContainerForEmailNameDate.append(h3);
  h2AndP.append(h2);
  h2AndP.append(p);
  div.append(imgAndDate);
  div.append(h2AndP);
  div.classList.add("p-2");
  a.classList.add("card");
  a.classList.add("m-3");
  a.classList.add("text-decoration-none");
  a.classList.add("cards");
  a.classList.add("shadow");
  a.classList.add("col-10");
  section.append(a);
}
/**
 * function that creates html based on one singular object
 * @param {object} object
 * @param {variable} section
 */
function createOneItem(object, section) {
  let { title, body, created, author } = object;
  let divContainer = document.createElement("div");
  let div = document.createElement("div");
  let imgAndDate = document.createElement("div");
  let ContainerForEmailNameDate = document.createElement("div");
  let h2AndP = document.createElement("div");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let img = document.createElement("img");
  let name = document.createElement("p");
  let email = document.createElement("p");
  imgAndDate.classList.add("d-flex");
  imgAndDate.classList.add("flex-wrap");
  imgAndDate.classList.add("align-items-center");
  imgAndDate.classList.add("justify-content-center");
  imgAndDate.classList.add("justify-content-sm-start");
  h2AndP.classList.add("py-3");
  h2AndP.classList.add("px-2");
  img.src = `/img/users.jpg`;
  img.classList.add("img-thumbnail");
  img.classList.add("usersImg");
  img.classList.add("rounded-circle");
  ContainerForEmailNameDate.classList.add("d-flex");
  ContainerForEmailNameDate.classList.add("flex-column");
  ContainerForEmailNameDate.classList.add("m-2");
  ContainerForEmailNameDate.classList.add("col-12");
  ContainerForEmailNameDate.classList.add("col-sm-6");
  ContainerForEmailNameDate.classList.add("align-items-center");
  ContainerForEmailNameDate.classList.add("align-items-sm-start");
  name.classList.add("my-0");
  h3.classList.add("my-1");
  email.classList.add("m-0");
  email.classList.add("mw-100");
  name.classList.add("mw-100");
  h3.classList.add("mw-100");
  h2.innerText = title;
  h3.innerText = formatDates(created);
  p.innerText = body;
  name.innerText = author.name;
  email.innerText = author.email;
  imgAndDate.append(img);
  imgAndDate.append(ContainerForEmailNameDate);
  ContainerForEmailNameDate.append(name);
  ContainerForEmailNameDate.append(email);
  ContainerForEmailNameDate.append(h3);
  h2AndP.append(h2);
  h2AndP.append(p);
  div.append(imgAndDate);
  div.append(h2AndP);
  div.classList.add("p-2");
  divContainer.append(imgAndDate);
  divContainer.append(h2AndP);
  divContainer.classList.add("p-2");
  divContainer.classList.add("card");
  divContainer.classList.add("m-3");
  divContainer.classList.add("text-decoration-none");
  divContainer.classList.add("cards");
  divContainer.classList.add("shadow");
  divContainer.classList.add("col-10");
  section.append(divContainer);
}
/**
 * function that creates HTML for users own posts, this allows them to update or delete them.
 * @param {object} object
 * @param {variable} section
 */
function createUserPost(object, section) {
  let { title, body, created, id } = object;
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let divForbtn = document.createElement("div");
  let deletebtn = document.createElement("button");
  let editbtn = document.createElement("button");
  editbtn.innerText = "Edit";
  deletebtn.innerText = "Delete";
  h2.innerText = title;
  h3.innerText = formatDates(created);
  p.innerText = body;
  div.append(h2);
  div.append(h3);
  div.append(p);
  divForbtn.append(editbtn);
  divForbtn.append(deletebtn);
  div.append(divForbtn);
  div.setAttribute("id", id);
  deletebtn.dataset.deleteid = id;
  divForbtn.classList.add("mt-3");
  divForbtn.classList.add("d-flex");
  deletebtn.classList.add("mx-2");
  deletebtn.classList.add("bg-danger");
  deletebtn.classList.add("delete");
  deletebtn.classList.add("btnCard");
  editbtn.dataset.editid = id;
  editbtn.classList.add("bg-following");
  editbtn.classList.add("edit");
  editbtn.classList.add("bg-opacity-50");
  editbtn.classList.add("mx-2");
  editbtn.classList.add("px-4");
  editbtn.classList.add("btnCard");
  deletebtn.classList.add("bg-opacity-70");
  div.classList.add("p-2");
  div.classList.add("card");
  div.classList.add("my-4");
  div.classList.add("mx-2");
  div.classList.add("cards");
  div.classList.add("shadow");
  div.classList.add("col-10");
  section.append(div);
}
/**
 * function that filter thru an array and makes a new array based on what is search on
 * this search function looks in both title and body text of posts, so a user can search for both title and body text.
 * @param {array} array
 * @param {variable} searchbar html input
 * @param {variable} section  html elementent
 */
function search(array, searchbar, section) {
  let searchValue = searchbar.value.toLowerCase().trim();
  let searchResult = array.filter((search) => {
    console.log(search.length);
    let { body, title } = search;
    if (title.toLowerCase().includes(searchValue)) {
      return true;
    } else if (body != null) {
      if (body.toLowerCase().includes(searchValue)) {
        return true;
      }
    }
  });
  console.log(searchResult);
  if (searchResult.length >= 1) {
    let length= searchResult.length;
    let numberResults= document.createElement("p");
    numberResults.innerText= `${length} results on your search: ${searchValue}`;
    numberResults.classList.add("text-center")
    section.append(numberResults);
    searchResult.forEach((object) => {
      createFeedContent(object, section);
    });
  } else {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    h1.innerText = "Sorry no results";
    div.append(h1);
    div.classList.add("text-center");
    section.append(div);
  }
}
/**
 * function that creates an edit form.
 * @param {variable} section
 * @param {number} id
 */
function createEditForm(section, id) {
  let form = document.createElement("form");
  let title = document.createElement("textarea");
  let bodyText = document.createElement("textarea");
  let updatePost = document.createElement("input");
  updatePost.setAttribute("type", "submit");
  title.innerText = section.querySelector("h2").innerText;
  bodyText.innerText = section.querySelector("p").innerText;
  form.classList.add("p-3");
  form.classList.add("d-flex");
  form.classList.add("flex-column");
  form.classList.add("align-items-center");
  title.classList.add("rounded-top");
  title.classList.add("border-2");
  title.classList.add("py-1");
  title.classList.add("col-12");
  title.classList.add("text-center");
  title.setAttribute("cols", 40);
  title.setAttribute("rows", 1);
  title.setAttribute("id", "title");
  bodyText.setAttribute("id", "body");
  bodyText.classList.add("rounded-bottom");
  bodyText.classList.add("border-2");
  bodyText.classList.add("py-1");
  bodyText.classList.add("col-12");
  bodyText.classList.add("text-center");
  bodyText.setAttribute("cols", 40);
  bodyText.setAttribute("rows", 5);
  updatePost.classList.add("bg-btn");
  updatePost.classList.add("m-2");
  updatePost.classList.add("update");
  updatePost.setAttribute("value", "Update");
  updatePost.dataset.updateid = id;
  updatePost.style.width = "120px";
  section.classList.add("bg-transparent");
  section.classList.remove("shadow");
  section.classList.remove("card");
  section.innerText = "";
  form.append(title);
  form.append(bodyText);
  form.append(updatePost);
  section.append(form);
}
/**
 * function that checks if a input have the required length,
 * if so it returns true, else it adds styles, tells the user the required length and returns false
 * @param {string} type
 * @param {variable} input
 * @param {variable} label
 * @param {number} length
 * @returns {boolean}
 */
function validateLength(type, input, label, length) {
  let inputValue = input.value;
  if (inputValue.length < length) {
    label.innerText = `${type} needs to be a at least ${length} characters long`;
    label.classList.add("text-danger");
    input.classList.add("border-danger");
    return false;
  } else {
    label.innerText = `${type}`;
    label.classList.remove("text-danger");
    input.classList.remove("border-danger");
    return true;
  }
}
/**
 * function that checks that the email got the correct format if so it returns true,
 * else it will tell the user the correct format, add styles and return false.
 * @param {variable} email
 * @param {variable} emailLabel
 * @returns {boolean}
 */
function emailValidation(email, emailLabel) {
  let emailValue = email.value;
  const regexNoroff = /\S+@noroff.no/;
  const regexNoroffStud = /\S+@stud.noroff.no/;
  if (
    regexNoroff.test(emailValue) === true ||
    regexNoroffStud.test(emailValue) === true
  ) {
    email.classList.remove("border-danger");
    emailLabel.classList.remove("text-danger");
    emailLabel.innerText = "Email";
    return true;
  } else {
    email.classList.add("border-danger");
    emailLabel.classList.add("text-danger");
    emailLabel.innerText =
      "Invalid email, email must be either @noroff.no or @stud.noroff.no";
    return false;
  }
}
/**
 * function that checks if password and repeat password match, if so it returns true,
 * else it will tell the user, add styles and return false
 * @param {variable} pass
 * @param {variable} repeatPass
 * @param {variable} rePassLabel
 * @returns {boolean}
 */
function passwordsAreEquel(pass, repeatPass, rePassLabel) {
  let value1 = pass.value;
  let value2 = repeatPass.value;
  if (value1 === value2) {
    pass.classList.remove("border-danger");
    repeatPass.classList.remove("border-danger");
    rePassLabel.classList.remove("text-danger");
    rePassLabel.innerText = "Repeat Password";
    return true;
  } else {
    pass.classList.add("border-danger");
    repeatPass.classList.add("border-danger");
    rePassLabel.classList.add("text-danger");
    rePassLabel.innerText = "Repeat Password must match password";
    return false;
  }
}
