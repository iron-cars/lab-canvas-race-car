const ctx = document.getElementById('cars').getContext('2d');  

class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  moveCar(futureX) {
    if (futureX >= 0 && futureX <= 375) {
      this.x = futureX;
    }
  }
}

let userCar = new Car(0, 650, 50, 100);
const carImg = new Image();
carImg.src = './images/car.png';
function drawCar() {
  ctx.clearRect(0, 0, 400, 800);
  ctx.fillRect(userCar.x, userCar.y, userCar.width, userCar.height);
  ctx.drawImage(carImg, userCar.x, userCar.y, userCar.width, userCar.height);
}

document.getElementById("start-button").onclick = function() {
  startGame();
};

function startGame() {
  drawCar();
  requestAnimationFrame(startGame);
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      console.log('left');
      userCar.moveCar(userCar.x - 50); 
      console.log(userCar.x)
      break;
    case 39:
      console.log('right');
      userCar.moveCar(userCar.x + 50);
      console.log(userCar.x)
      break;
  }
}

