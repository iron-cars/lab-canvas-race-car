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

class Obstacle{
  constructor(x,y,width,height,type){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.type = type;
  }
  moveDownForever(){
     let blah = setInterval(()=>{
      //    each setInterval function gets a unique ID
      // were using blah here to save this ID
          this.y += 15;
          if(this.y > 800){
              clearInterval(blah)
          }
      },100)
  }
 }


let userCar = new Car(0, 650, 50, 100);
const carImg = new Image();
const coneImg = new Image();
const potholeImg = new Image();
const barricadeImg = new Image();
carImg.src = './images/car.png';
coneImg.src = './images/cone.png';
potholeImg.src = './images/pothole.png';
barricadeImg.src = './images/barricade.png';
let typesOfObs = [coneImg, potholeImg, barricadeImg];
let obsArr = [];
function drawImages() {
  ctx.clearRect(0, 0, 400, 800);
  // ctx.fillRect(userCar.x, userCar.y, userCar.width, userCar.height);
  ctx.drawImage(carImg, userCar.x, userCar.y, userCar.width, userCar.height);
  for (let i = 0; i < obsArr.length; i++) {
    ctx.drawImage(typesOfObs[obsArr[i].type], obsArr[i].x, obsArr[i].y, obsArr[i].width, obsArr[i].height);
  }
}

function createObstacle () {
  let r = Math.floor(Math.random() * 3);
  let y = 0;
  let x;
  let width;
  let height;
  switch (r) {
    case 0:
      x = Math.floor(Math.random() * 365) + 5;
      width = 25;
      height = 50;
      let cone = new Obstacle(x, y, width, height, r);
      cone.moveDownForever();
      obsArr.push(cone);
      break;
    case 1:
      x = Math.floor(Math.random() * 365) + 5;
      width = 25;
      height = 50;
      let pothole = new Obstacle(x, y, width, height, r);
      pothole.moveDownForever();
      obsArr.push(pothole);
      break;
    case 2:
      x = Math.floor(Math.random() * 350) + 5;
      width = 40;
      height = 30;
      let barricade = new Obstacle(x, y, width, height, r);
      barricade.moveDownForever();
      obsArr.push(barricade);
      break;
  }
}



document.getElementById("start-button").onclick = function() {
  startGame();
};
function startGame() {
  drawImages();
  requestAnimationFrame(startGame);
}




document.onkeydown = function(e) {
  console.log(e.keyCode);
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
    case 79:
      createObstacle();
      break;      
  }
}


