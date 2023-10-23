export{getPosts, getAllPostsInTheApi}
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