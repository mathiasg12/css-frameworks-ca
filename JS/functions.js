export { registerUser, createUser, loginUser,getPosts };
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
    localStorage.setItem("Token", responseJson.accessToken);
  } catch (error) {
    console.log(error);
  }
}
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
    let response= await fetch(url,posts);
    let responseJson= await response.json();
    console.log(responseJson);
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
