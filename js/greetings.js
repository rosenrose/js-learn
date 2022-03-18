const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const USERNAME_KEY = "username";

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername) {
  drawGreetings(savedUsername);
} else {
  loginForm.hidden = false;
  loginForm.addEventListener("submit", onLoginSubmit);
}

function drawGreetings(name) {
  greeting.hidden = false;
  greeting.textContent = `Hello ${name}`;
}

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.hidden = true;
  const username = loginInput.value.trim();
  localStorage.setItem(USERNAME_KEY, username);
  drawGreetings(username);
}
