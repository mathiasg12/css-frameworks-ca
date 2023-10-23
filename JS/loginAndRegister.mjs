export{
    registerUser,
    loginUser,
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
      h3.innerText = error +":"+" "+ "please try again later";
      h3.classList.add("text-danger");
    }
  }
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
      let responseJson = await response.json();
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
      h3.innerText = error +":"+" "+ "please try again later";
      h3.classList.add("text-danger");
    }
  };
