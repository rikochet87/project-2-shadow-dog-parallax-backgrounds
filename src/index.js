import Importlayer1 from "../img/layer-1.png";
import Importlayer2 from "../img/layer-2.png";
import Importlayer3 from "../img/layer-3.png";
import Importlayer4 from "../img/layer-4.png";
import Importlayer5 from "../img/layer-5.png";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 10;

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const backgroundLayer1 = createImage(Importlayer1);
const backgroundLayer2 = createImage(Importlayer2);
const backgroundLayer3 = createImage(Importlayer3);
const backgroundLayer4 = createImage(Importlayer4);
const backgroundLayer5 = createImage(Importlayer5);

const slider = document.getElementById("slider");
slider.value = gameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener("change", function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 1667;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  requestAnimationFrame(animate);
  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
}
animate();
