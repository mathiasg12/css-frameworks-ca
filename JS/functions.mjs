export {
  createUser,
  createPost,
  formatDates,
  getFilterValue,
};
/**
 * function that creates an object from user input, used when a user register an account
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
 * function that creates an object from user input used when a user creates a post
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
/**
 * simple functions that formats a date to a new format better for blog posts
 * @param {string} timeToFormat, the time format used in the api 
 * @returns {string} new format that is better for posts
 */
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
 * function that gets the value of the radio buttons depending on which one that is checked(30,50,100)
 * @returns string
 */
function getFilterValue(filterPerPage) {
  if (filterPerPage[0].checked) {
    return filterPerPage[0].value;
  } else if (filterPerPage[1].checked) {
    return filterPerPage[1].value;
  } else {
    return filterPerPage[2].value;
  }
}
