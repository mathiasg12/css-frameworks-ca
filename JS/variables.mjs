export {REGISTER_URL, LOGIN_URL, POSTS_URL, userName,USER_POSTS_URL,URL,authorTrue};
const URL= "https://api.noroff.dev";
const userName= localStorage.getItem("name");
const REGISTER_ENDPOINT= "/api/v1/social/auth/register";
const LOGIN_ENDPOINT= "/api/v1/social/auth/login";
const POSTS_ENDPOINT= "/api/v1/social/posts";
const authorTrue= "?_author=true"
const POSTS_URL= URL+POSTS_ENDPOINT;
const LOGIN_URL= URL+LOGIN_ENDPOINT;
const REGISTER_URL= URL+REGISTER_ENDPOINT;
const GET_USER_POSTS_ENDPOINT= `/api/v1/social/profiles/${userName}/posts`;
const USER_POSTS_URL= URL+GET_USER_POSTS_ENDPOINT;

