import { REGISTER_URL, LOGIN_URL } from "./variables.mjs";
import {
  registerUser,
  createUser,
  loginUser,
  emailValidation,
  validateLength,
  passwordsAreEquel,
} from "././functions.mjs";
const signUpH3 = document.getElementById("signUpH3");
const loginH3 = document.getElementById("loginH3");
const registerEmail = document.getElementById("emailSignup");
const registerEmailLabel = document.getElementById("emailSignupLabel");
const registerName = document.getElementById("name");
const registerpassword = document.getElementById("passwordSignup");
const registerpasswordLabel = document.getElementById("passwordSignupLabel");
const registerRepeatPassword = document.getElementById("RepasswordSignup");
const registerRepeatPasswordLabel = document.getElementById("RepasswordSignupLabel");
const registerBtn = document.getElementById("signUp");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginEmailLabel = document.getElementById("loginEmailLabel");
const loginPasswordLabel = document.getElementById("loginPasswordLabel");
const loginBtn = document.getElementById("login");
const signUpForm= document.getElementById("formSignup");
const loginForm= document.getElementById("form");
registerBtn.addEventListener("click", () => {
  emailValidation(registerEmail, registerEmailLabel);
  validateLength("Password", registerpassword, registerpasswordLabel, 8);
  passwordsAreEquel(
    registerpassword,
    registerRepeatPassword,
    registerRepeatPasswordLabel
  );
  if (
    emailValidation(registerEmail, registerEmailLabel) === true &&
    validateLength("Password", registerpassword, registerpasswordLabel, 8) ===
      true &&
    passwordsAreEquel(
      registerpassword,
      registerRepeatPassword,
      registerRepeatPasswordLabel
    )
  ) {
    registerUser(
      REGISTER_URL,
      LOGIN_URL,
      createUser(
        registerName.value.trim(),
        registerEmail.value.trim(),
        registerpassword.value.trim()
      ),
      registerEmail.value,
      registerpassword.value,
      signUpH3
    );
  } else {
    registerEmail.addEventListener("keyup", () => {
      emailValidation(registerEmail, registerEmailLabel);
    });
    registerpassword.addEventListener("keyup", () => {
      validateLength("Password", registerpassword, registerpasswordLabel, 8);
    });
    registerRepeatPassword.addEventListener("keyup", () => {
      passwordsAreEquel(
        registerpassword,
        registerRepeatPassword,
        registerRepeatPasswordLabel
      );
    });
  }
});
loginBtn.addEventListener("click", () => {
  emailValidation(loginEmail, loginEmailLabel);
  validateLength("Password", loginPassword, loginPasswordLabel, 8);
  if (
    emailValidation(loginEmail, loginEmailLabel) === true &&
    validateLength("Password", loginPassword, loginPasswordLabel, 8) === true
  ) {
    loginUser(
      LOGIN_URL,
      loginEmail.value.trim(),
      loginPassword.value.trim(),
      loginH3
    );
  } else {
    loginEmail.addEventListener("keyup", () => {
      emailValidation(loginEmail, loginEmailLabel);
    });
    loginPassword.addEventListener("keyup", () => {
      validateLength("Password", loginPassword, loginPasswordLabel, 8);
    });
  }
});
signUpForm.addEventListener("keyup",()=>{
    signUpH3.innerText="Sign up"
    signUpH3.classList.remove("text-danger")
})
loginForm.addEventListener("keyup",()=>{
    loginH3.innerText="Login"
    loginH3.classList.remove("text-danger")
})