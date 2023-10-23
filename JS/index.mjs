import { REGISTER_URL, LOGIN_URL } from "./variables.mjs";
import { createUser } from "././functions.mjs";
import {
  emailValidation,
  validateLength,
  passwordsAreEquel,
} from "././validation-functions.mjs";
import { registerUser, loginUser } from "././loginAndRegister.mjs";
const signUpH3 = document.getElementById("signUpH3");
const loginH3 = document.getElementById("loginH3");
const registerEmail = document.getElementById("emailSignup");
const registerEmailLabel = document.getElementById("emailSignupLabel");
const registerName = document.getElementById("name");
const registerpassword = document.getElementById("passwordSignup");
const registerpasswordLabel = document.getElementById("passwordSignupLabel");
const registerRepeatPassword = document.getElementById("RepasswordSignup");
const registerRepeatPasswordLabel = document.getElementById(
  "RepasswordSignupLabel"
);
const registerBtn = document.getElementById("signUp");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginEmailLabel = document.getElementById("loginEmailLabel");
const loginPasswordLabel = document.getElementById("loginPasswordLabel");
const loginBtn = document.getElementById("login");
const signUpForm = document.getElementById("formSignup");
const loginForm = document.getElementById("form");
/**
 * eventlistener that runs if a user clicks the register button,
 * the the function will use validation functions to check the input and deliver an error message if the input is wrong,
 * if the input is in the correct format the function will run a function that register the user
 */
registerBtn.addEventListener("click", (click) => {
  click.preventDefault();
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
/**
 * eventlistener that runs when the login button is pressed, it will first run the validation functions to check that the input
 * is the correct format the it will send a request to the api, if the login information is correct it will store the access token in local storage,
 * and direct the user to the feed page
 */
loginBtn.addEventListener("click", (click) => {
  click.preventDefault();
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
/**
 * simple function that corrects the sign up header when something in the form changes
 */
signUpForm.addEventListener("keyup", () => {
  signUpH3.innerText = "Sign up";
  signUpH3.classList.remove("text-danger");
});
/**
 * simple function that corrects the login header when something in the form changes
 */
loginForm.addEventListener("keyup", () => {
  loginH3.innerText = "Login";
  loginH3.classList.remove("text-danger");
});
