// ------------------------ Main Page
const mainpage = document.querySelector("#container");
mainpage.id = "mainpage";

const welcome = document.querySelector("#welcome");
welcome.id = "welcome";

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
loginHeadline.innerHTML = "> Login"
form.appendChild(loginHeadline);

let userNameInput = document.createElement("input");
formular.appendChild(userNameInput);
userNameInput.name = "userName";
userNameInput.id = 'userNameInput';
userNameInput.placeholder = "name";
userNameInput.type = "txt";

let userPasswort = document.createElement("input");
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

const USERS = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];




// --------------------- Main Page

function enterMainPage(){
    const userName = userNameInput.value;
    const passwort = userPasswort.value;

    containerLogIn.classList.remove("displayBlock");
    containerLogIn.classList.add("displayHide");
    mainpage.classList.remove("displayBlur");
    showName();
    setCookie("userName", userName, 1);
    setCookie("passwort", passwort, 1);
    setCookie("logged_in", "true", 1);
};


// --------------------- User Check
let welcomeName = document.querySelector('#welcome').innerHTML;
const info = document.createElement('p');
formular.appendChild(info);

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const user = USERS.find(item => item.name === userNameInput.value);
    const password = USERS.find(item => item.secret === userPasswort.value);

    if (user){
        welcomeName = user.name;
        if (user.secret.toLowerCase() === userPasswort.value.toLowerCase()){
            console.log(userPasswort.value);
            enterMainPage();
          }
    } else if (!user){
        userNameInput.style.color = 'red';
        info.innerHTML = 'Name does not exist';
        info.style.color = 'red'
    } else if (!password) {
        userPasswort.style.color= 'red';
        info.innerHTML = 'Password does not exist';
        info.style.color = 'red'
    }
});

// --------------------- Load Event

document.onload = checkCookie();

function checkCookie(){
  if (getCookie("userName") === ''){
    loginPage()
  } else {
    welcomeName = getCookie("userName");
    showName();
    mainpage.classList.add("displayBlock");
    containerLogIn.classList.add("displayHide");
  }
};

function loginPage(){
  mainpage.classList.add("displayBlur");
};


// --------------------- User Name on Mainpage

function showName(){
    welcome.innerHTML = welcomeName;
};


// ------------------------ Cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }  


  // ------------------------ Log out
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e)=>{
  deleteCookie('userName');
  mainpage.classList.remove("displayBlock");
  mainpage.classList.add("displayBlur");
  containerLogIn.classList.remove("displayHide");
  containerLogIn.classList.add("displayBlock");
});

function deleteCookie(){                                              // Wie kann man das kürzer schreiben?
  document.cookie = 'userName' + '=0; expires=Thu, 18 Dec 2013 12:00:00 UTC'; 
  document.cookie = 'passwort' + '=0; expires=Thu, 18 Dec 2013 12:00:00 UTC';
  document.cookie = 'logged_in' + '=0; expires=Thu, 18 Dec 2013 12:00:00 UTC';
};
