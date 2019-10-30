const ctx = document.getElementById('cars').getContext('2d');  
// window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }
// };

class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  moveCar(futureX){

    if(futureX + this.width <= 400 && futureX >= 0){
        this.x = futureX;
    }
   
  }
}
   
let userCar = new Car(200, 700, 50, 100);
const carImg = new Image();
carImg.src = './images/car.png';
carImg.onload = () => {
  ctx.clearRect(0, 0, 400, 800);
  ctx.drawImage(carImg, userCar.x, userCar.y, userCar.width, userCar.height);
  console.log(ctx);
}
