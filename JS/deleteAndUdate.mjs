export { deletePost, updatePost };
/**
 * function that lets users delete a post
 * @param {string} url
 */
async function deletePost(url, section) {
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
    let h2 = document.createElement("h2");
    h2.innerText = error + ":" + " " + "please try again later";
    h2.classList.add("text-danger");
    h2.classList.add("m-5");
    h2.classList.add("text-center");
    section.prepend(h2);
  }
}
/**
 * function that sends a PUT request to update a post in the api, takes to parameters the Url to the api and a object that gets stored.
 * @param {string} url
 * @param {object} object
 */
async function updatePost(url, object, section) {
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
    let h2 = document.createElement("h2");
    h2.innerText = error + ":" + " " + "please try again later";
    h2.classList.add("text-danger");
    h2.classList.add("m-5");
    h2.classList.add("text-center");
    section.prepend(h2);
  }
}
