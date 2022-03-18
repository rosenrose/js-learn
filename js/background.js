const images = ["0.png", "1.png", "2.png"];
const todaysImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${todaysImage}`;
document.body.append(bgImage);
