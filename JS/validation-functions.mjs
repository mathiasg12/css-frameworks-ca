export{
    emailValidation,
    validateLength,
    passwordsAreEquel,
}
/**
 * function that checks if a input have the required length,
 * if so it returns true, else it adds styles, tells the user the required length and returns false
 * @param {string} type
 * @param {variable} input
 * @param {variable} label
 * @param {number} length
 * @returns {boolean}
 */
function validateLength(type, input, label, length) {
    let inputValue = input.value;
    if (inputValue.length < length) {
      label.innerText = `${type} needs to be a at least ${length} characters long`;
      label.classList.add("text-danger");
      input.classList.add("border-danger");
      return false;
    } else {
      label.innerText = `${type}`;
      label.classList.remove("text-danger");
      input.classList.remove("border-danger");
      return true;
    }
  }
  /**
   * function that checks that the email got the correct format if so it returns true,
   * else it will tell the user the correct format, add styles and return false.
   * @param {variable} email
   * @param {variable} emailLabel
   * @returns {boolean}
   */
  function emailValidation(email, emailLabel) {
    let emailValue = email.value;
    const regexNoroff = /\S+@noroff.no/;
    const regexNoroffStud = /\S+@stud.noroff.no/;
    if (
      regexNoroff.test(emailValue) === true ||
      regexNoroffStud.test(emailValue) === true
    ) {
      email.classList.remove("border-danger");
      emailLabel.classList.remove("text-danger");
      emailLabel.innerText = "Email";
      return true;
    } else {
      email.classList.add("border-danger");
      emailLabel.classList.add("text-danger");
      emailLabel.innerText =
        "Invalid email, email must be either @noroff.no or @stud.noroff.no";
      return false;
    }
  }
  /**
   * function that checks if password and repeat password match, if so it returns true,
   * else it will tell the user, add styles and return false
   * @param {variable} pass
   * @param {variable} repeatPass
   * @param {variable} rePassLabel
   * @returns {boolean}
   */
  function passwordsAreEquel(pass, repeatPass, rePassLabel) {
    let value1 = pass.value;
    let value2 = repeatPass.value;
    if (value1 === value2) {
      pass.classList.remove("border-danger");
      repeatPass.classList.remove("border-danger");
      rePassLabel.classList.remove("text-danger");
      rePassLabel.innerText = "Repeat Password";
      return true;
    } else {
      pass.classList.add("border-danger");
      repeatPass.classList.add("border-danger");
      rePassLabel.classList.add("text-danger");
      rePassLabel.innerText = "Repeat Password must match password";
      return false;
    }
  }