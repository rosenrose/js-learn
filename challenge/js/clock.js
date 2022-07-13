const clock = document.querySelector("#clock");

getTime();
setInterval(getTime, 1000);

function getTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours} : ${minutes} : ${seconds}`;
}
