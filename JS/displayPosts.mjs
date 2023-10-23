export { displayPosts };
import { getPosts } from "./getPosts.mjs";
/**
 * asunc function that stores posts from the getpost function, then loops thru the array and calls a function to display the data returned on a section, the removes the loader symbol
 * @param {var} url
 * @param {function} createHtml
 * @param {var} section
 * @param {var} loader
 */
async function displayPosts(url, createHtml, section, loader) {
  let arrayOfPosts = await getPosts(url, section);
  loader.classList.add("d-none");
  arrayOfPosts.forEach((object) => {
    createHtml(object, section);
  });
}
