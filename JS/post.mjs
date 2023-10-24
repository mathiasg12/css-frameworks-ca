export{sendPost}
/**
 *  function that sends a post(object) to the api
 * @param {string} url
 * @param {object} object
 */
async function sendPost(url, object,section) {
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
      let h2= document.createElement("h2")
      h2.innerText = error +":"+" "+ "please try again later";
      h2.classList.add("text-danger");
      h2.classList.add("m-5")
      h2.classList.add("text-center")
      section.prepend(h2)
    }
  }