

// ------------------------ Log In

const containerLogIn = document.createElement("div");
containerLogIn.id = "containerLogIn";
const body = document.querySelector("body");
body.appendChild(containerLogIn);

const formular = document.createElement("form");
formular.id = "form";
containerLogIn.appendChild(formular);

const loginHeadline = document.createElement("h1");
loginHeadline.id = "loginHeadline";
loginHeadline.innerHTML = "> Login";
form.appendChild(loginHeadline);

const userNameInput = document.createElement("input");
formular.appendChild(userNameInput);
userNameInput.name = "userName";
userNameInput.placeholder = "name";
userNameInput.type = "txt";

const userPasswort = document.createElement("input");
formular.appendChild(userPasswort);
userPasswort.name = "passwort";
userPasswort.placeholder = "passwort";
userPasswort.type = "password";

const submitButton = document.createElement("input");
submitButton.id = "submitButton";
formular.appendChild(submitButton);
submitButton.name = "button";
submitButton.value = "Submit";
submitButton.type = "submit";


// --------------------- Main Page

const mainpage = document.querySelector("#container");
mainpage.id = "mainpage";

const welcome = document.querySelector("#welcome");
welcome.id = "welcome";


function enterMainPage() {
  
  const userName = userNameInput.value;
  const passwort = userPasswort.value;

  containerLogIn.classList.remove("displayBlock");
  containerLogIn.classList.add("displayHide");
  mainpage.classList.remove("displayBlur");
  showName();
  setCookie("userName", userName, 1);
  setCookie("passwort", passwort, 1);
  setCookie("logged_in", "true", 1);
}


// --------------------- User Check
const welcomeName = document.querySelector("#welcome").innerHTML;
const info = document.createElement("p");
const span = document.createElement("span");
formular.appendChild(info);


submitButton.addEventListener("click", (e) => {

  e.preventDefault();
  const user = userNameInput.value;
  const password = userPasswort.value;

  fetch("https://supercode-auth-demo.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userNameInput.value,
      secret: userPasswort.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        welcomeName = user.name;
        if (user.toLowerCase() === userNameInput.value.toLowerCase()) {
          enterMainPage();
        }
      }
      if (!user) {
         // Wie kann man das kürzer schreiben?
        userNameInput.style.color = "red";
        info.innerHTML = data.message;
        info.style.color = "red";
        formular.appendChild(span);
        span.innerHTML = "*";
        span.style.color = "red";
        span.classList.add("star1");
      }
      if (user && password !== user.secret) {
        userPasswort.style.color = "red";
        info.innerHTML = data.message;
        info.style.color = "red";
        formular.appendChild(span);
        span.innerHTML = "*";
        span.style.color = "red";
        span.classList.add("star2");
      }
    });
});


// --------------------- Load Event

document.onload = checkCookie();

function checkCookie() {

  if (getCookie("userName") === "") {
    loginPage();
  } else {
    welcomeName = getCookie("userName");
    showName();
    mainpage.classList.add("displayBlock");
    containerLogIn.classList.add("displayHide");
  }
};

function loginPage() {
  mainpage.classList.add("displayBlur");
};


// --------------------- User Name on Mainpage

function showName() {
  welcome.innerHTML = welcomeName;
};


// ------------------------ Cookies

function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {

  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};


// ------------------------ Log out

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {

  deleteCookie("userName");
  mainpage.classList.remove("displayBlock");
  mainpage.classList.add("displayBlur");
  containerLogIn.classList.remove("displayHide");
  containerLogIn.classList.add("displayBlock");
});


function deleteCookie() {
  // Wie kann man das kürzer schreiben?
  document.cookie = "userName" + "=0; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  document.cookie = "passwort" + "=0; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  document.cookie = "logged_in" + "=0; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  location.reload();
};
