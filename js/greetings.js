const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const loginDiv = document.querySelector("#login-div");
const greetingDiv = document.querySelector("#greeting-div");

const DNONE_CLASSNAME = "d-none";
const USERNAME_KEY = "username"

function onLoginSubmit(event) {
    event.preventDefault();
    loginDiv.classList.add(DNONE_CLASSNAME);
    const TypedUsername = loginInput.value;
    localStorage.setItem(USERNAME_KEY, TypedUsername);
    painGreetings(TypedUsername);
}

function painGreetings(username) {
    greeting.innerText = `Welcome, ${username}!!`;
    greetingDiv.classList.remove(DNONE_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginDiv.classList.remove(DNONE_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    painGreetings(savedUsername);
}