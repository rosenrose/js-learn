const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#range");
const mode = document.querySelector("#mode");
const save = document.querySelector("#save");
const random = document.querySelector("#random");
const reset = document.querySelector("#reset");
const colorInput = document.querySelector("#colorInput");
const colorDisplay = document.querySelector("#colorDisplay");
let isPainting = false;
let isFilling = false;
let isRandom = false;
let x, y;
const randomValue = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const initColor = document.querySelector(".controls_color:first-child").style.backgroundColor;
ctx.strokeStyle = initColor;
ctx.fillStyle = initColor;

const initWidth = range.value;
ctx.lineWidth = initWidth;
ctx.lineCap = "round";
ctx.lineJoin = "round";

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

document
  .querySelectorAll(".controls_color:not(#colorSelect)")
  .forEach((color) => color.addEventListener("click", handleColorClick));

range.addEventListener("input", handleRangeChange);
mode.addEventListener("click", handleModeClick);
save.addEventListener("click", handleSaveClick);
random.addEventListener("click", handleRandomClick);
reset.addEventListener("click", handleResetClick);
colorInput.addEventListener("change", handleColorInput);

function onMouseMove(event) {
  [x, y] = [event.offsetX, event.offsetY];

  if (isPainting && !isFilling) {
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
}

function startPainting() {
  isPainting = true;
  if (isRandom) {
    changeRandomColor();
  }
}

function stopPainting() {
  isPainting = false;
}

function handleColorClick(event) {
  changeColor(event.target.style.backgroundColor);
}

function handleColorInput(event) {
  changeColor(event.target.value);
}

function changeColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  colorDisplay.value = color.includes("rgb") ? rgbTohex(color) : color;
}

function handleRangeChange(event) {
  const { value } = event.target;
  ctx.lineWidth = value;
  event.target.setAttribute("value", parseFloat(value).toFixed(1));
}

function handleModeClick(event) {
  event.target.textContent = isFilling ? "Fill" : "Paint";
  isFilling = !isFilling;
}

function handleCanvasClick() {
  if (!isFilling) {
    return;
  }

  if (isRandom) {
    changeColor(randomColor());
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}

function handleRandomClick() {
  random.textContent = isRandom ? "Random" : "Normal";
  isRandom = !isRandom;
}

function handleResetClick() {
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = initWidth;
  range.value = initWidth;
  range.setAttribute("value", initWidth);
  colorDisplay.value = "black";
}

function changeRandomColor() {
  if (!isPainting || !isRandom || isFilling) {
    return;
  }

  setTimeout(() => {
    changeColor(randomColor());
    ctx.beginPath();
    ctx.moveTo(x, y);
    changeRandomColor();
  }, Math.random() * 100);
}

function rgbTohex(color) {
  const rgb = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color).slice(1);
  const hex = rgb.map((c) => parseInt(c).toString(16).padStart(2, "0")).join("");
  return `#${hex}`;
}
