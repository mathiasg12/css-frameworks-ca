export {
  createUser,
  getPosts,
  createFeedContent,
  createPost,
  formatDates,
  getAllPostsInTheApi,
};
/**
 * GET request to the api that gets posts using the accesstoken stored in local storage
 * @param {string} url
 * @example
 * getPosts(example/api/posts)
 */
async function getPosts(url, section) {
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
    let h2 = document.createElement("h2");
    h2.innerText = error + ":" + " " + "please try again later";
    h2.classList.add("text-danger");
    h2.classList.add("m-5");
    h2.classList.add("text-center");
    section.append(h2);
  }
}
/**
 * GET request to the api that gets posts using the accesstoken stored in local storage,
 * and stores all posts in an array
 * @param {string} url
 * @returns array
 */
async function getAllPostsInTheApi(url, section) {
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
        return flatArrayWithALlPosts;
      }
    }
  } catch (error) {
    console.log(error);
    let h2 = document.createElement("h2");
    h2.innerText = error + ":" + " " + "please try again later";
    h2.classList.add("text-danger");
    h2.classList.add("m-5");
    h2.classList.add("text-center");
    section.append(h2);
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
 * @returns object
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
