import { REGISTER_URL, LOGIN_URL } from "././variables.js";
import { registerUser, createUser,loginUser } from "././functions.js";
const registerEmail= document.getElementById("emailSignup");
const registerName= document.getElementById("name");
const registerpassword= document.getElementById("passwordSignup");
const registerRepeatPassword= document.getElementById("RepasswordSignup");
const registerBtn= document.getElementById("signUp");
const loginEmail= document.getElementById("email");
const loginPassword= document.getElementById("password");
const loginBtn= document.getElementById("login");
registerBtn.addEventListener("click",()=>{
    registerUser(REGISTER_URL, createUser(registerName.value.trim(),registerEmail.value.trim(),registerpassword.value.trim()));
});
loginBtn.addEventListener("click",()=>{
    loginUser(LOGIN_URL, loginEmail.value.trim(), loginPassword.value.trim());
});

