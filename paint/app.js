const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const random = document.querySelector("#random");
const colorInput = document.querySelector("#colorInput");
let isPainting = false;
let filling = false;
let isRandom = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const initColor = document.querySelector(".controls_color:first-child").style.backgroundColor;
ctx.strokeStyle = initColor;
ctx.fillStyle = initColor;
ctx.lineWidth = range.value;

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
colorInput.addEventListener("change", handleColorInput);
random.addEventListener("click", () => {
  random.textContent = isRandom ? "Random" : "Normal";
  isRandom = !isRandom;
});

function onMouseMove(event) {
  const { offsetX: x, offsetY: y } = event;

  if (isPainting) {
    ctx.lineTo(x, y);
    if (isRandom) {
      ctx.strokeStyle = randomColor();
    }
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function startPainting() {
  isPainting = true;
}

function stopPainting() {
  isPainting = false;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleColorInput(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
  filling = !filling;
  event.target.textContent = filling ? "Paint" : "Fill";
}

function handleCanvasClick() {
  if (filling) {
    if (isRandom) {
      ctx.fillStyle = randomColor();
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}

function randomColor() {
  //prettier-ignore
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
