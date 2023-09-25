export {REGISTER_URL, LOGIN_URL, POSTS_URL,POSTS_URL_ASC, userName,USER_POSTS_URL};
const URL= "https://api.noroff.dev";
const userName= localStorage.getItem("name");
const REGISTER_ENDPOINT= "/api/v1/social/auth/register";
const LOGIN_ENDPOINT= "/api/v1/social/auth/login";
const POSTS_ENDPOINT= "/api/v1/social/posts";
const ASCENDING_ORDER= "?sortOrder=asc"
const POSTS_URL= URL+POSTS_ENDPOINT;
const POSTS_URL_ASC= URL+POSTS_ENDPOINT+ASCENDING_ORDER;
const LOGIN_URL= URL+LOGIN_ENDPOINT;
const REGISTER_URL= URL+REGISTER_ENDPOINT;
const GET_USER_POSTS_ENDPOINT= `/api/v1/social/profiles/${userName}/posts`;
const USER_POSTS_URL= URL+GET_USER_POSTS_ENDPOINT;

