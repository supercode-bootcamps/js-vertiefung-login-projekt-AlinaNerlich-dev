const containerLogIn = document.createElement("div");
containerLogIn.id = "containerLogIn";
const body = document.querySelector("body");
body.appendChild(containerLogIn);

const mainpage = document.createElement("div");
mainpage.id = "mainpage";
body.appendChild(mainpage);

const welcome = document.createElement("p");
welcome.id = "welcome";
mainpage.appendChild(welcome);

const formular = document.createElement("form");
containerLogIn.appendChild(formular);

let userNameInput = document.createElement("input");
formular.appendChild(userNameInput);
userNameInput.name = "userName";
userNameInput.placeholder = "Name";
userNameInput.type = "txt";


let userPasswort = document.createElement("input");
formular.appendChild(userPasswort);
userPasswort.name = "passwort";
userPasswort.placeholder = "passwort";
userPasswort.type = "passwort";

const submitButton = document.createElement("input");
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
    mainpage.classList.remove("displayHide");
    showName();
    setCookie("userName", userName, 1);
    setCookie("passwort", passwort, 1);
    setCookie("logged_in", "true", 1);
};


// --------------------- User Check
let welcomeName = document.querySelector('#welcome').innerHTML;

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const user = USERS.find(item => item.name === userNameInput.value);


    if (user){
        welcomeName = ('> Welcome ' + user.name);
        if (user.secret.toLowerCase() === userPasswort.value.toLowerCase()){
            console.log(userPasswort.value);
            enterMainPage();
          }
    } else {
        console.log('User not existing')
    }
});

// --------------------- Load Event

document.onload = checkCookie();

function checkCookie(){
  if (getCookie("userName") === ''){
    loginPage()
  } else {
    welcomeName = getCookie("userName");
    mainpage.classList.add("displayBlock");
    containerLogIn.classList.add("displayHide");
  }
};

function loginPage(){
  mainpage.classList.add("displayHide");
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
