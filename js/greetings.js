const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const afterLogin = document.querySelector("#after-login");
const greeting = afterLogin.querySelector("#greeting");
const USERNAME_KEY = "username";

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername) {
  drawGreetings(savedUsername);
} else {
  loginForm.addEventListener("submit", onLoginSubmit);
  afterLogin.style.display = "none";
}

function drawGreetings(name) {
  loginForm.style.display = "none";
  afterLogin.style.display = "";
  greeting.textContent = `Hello ${name}!`;
}

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value.trim();
  localStorage.setItem(USERNAME_KEY, username);
  drawGreetings(username);
}
