const ctx = document.getElementById('cars').getContext('2d');  
// window.onload = function() {
//   document.getElementById("start-button").onclick = function() {
//     startGame();
//   };

//   function startGame() {

//   }
// };

class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let userCar = new Car(200, 700, 25, 50);

const carImg = new Image();
carImg.src = './images/car.png';
carImg.onload = () => {
  ctx.clearRect(0, 0, 400, 800);
  ctx.drawImage(carImg, userCar.x, userCar.y, userCar.width, userCar.height);
  console.log(ctx);
}
