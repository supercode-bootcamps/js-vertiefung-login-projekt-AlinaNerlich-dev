
    submitButton.addEventListener('click', (e) =>{
        e.preventDefault();
    
    for (let i = 0; i < USERS.length; i++) {
        if ((userNameInput.value == USERS[i].name) && 
        (userPasswort.value == USERS[i].secret)) 
        {
            alert ('Yeah')
          containerLogIn.classList.remove = "displayBlock";
          containerLogIn.classList.add = "displayHide";
          mainpage.classList.add = "displayBlock";
        } else {
          alert("User does nor exist");
        }
      }
})

let user

USERS.forEach(item => {
    if (item.name === userNameInput.value){
    user = item;
    }
})

if (!user){
    console.log('User not existing');
} else {
    console.log('User: ' + user.name);
}


// Filtermethode

const filtered = USERS.filter(item => item.name === userNameInput.value); // Gibt Array zurück

const filtered = USERS.filter(item => { // längere Schreibweise
    return item.name === userNameInput.value;});

if (filtered.length > 0){
    console.log('User: ' + filtered[0].name);
}

// Findmethode

const user1 = objectArray.find(item => item.name === userNameInput.value);// Gibt Objekt zurück

if (user1){
    console.log('User: ' + user.name);
    if(user.secret === userPasswort.value){
        alert('yeah')
    }
} else {
    console.log('User not existing');
}


// Set Cookie#

const loginName = 'David';

if(loginName == 'David'){
    document.cookie = 'user' + loginName;
    //oder mit der funtion von w3school
    setCookie('login', loginName, 3)
}

// Get Cookie
const cookoe = getCookie('login');

if (cookie ===''){
    console.log('nicht eingelogt')
} else{
    console.log('eingelogt als:' + cookie)
};


// Cookie löschen

function logout(){
    deleteCookie('login');
    console.log('ausgeloggt');
}

function deleteCookie(){
    document.cookie = name + '=0; expires=Thi, 18 Dec 2013 12:00:00 UTC';
};