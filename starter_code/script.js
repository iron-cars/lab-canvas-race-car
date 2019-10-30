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
          this.y += fallSpeed;
          if(this.y > 800){
              clearInterval(blah)
          }
      },25)
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
    // ctx.fillRect(obsArr[i].x, obsArr[i].y, obsArr[i].width, obsArr[i].height);
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
      x = Math.floor(Math.random() * 355) + 5;
      width = 35;
      height = 70;
      let cone = new Obstacle(x, y, width, height, r);
      cone.moveDownForever();
      obsArr.push(cone);
      break;
    case 1:
      x = Math.floor(Math.random() * 340) + 5;
      width = 50;
      height = 50;
      let pothole = new Obstacle(x, y, width, height, r);
      pothole.moveDownForever();
      obsArr.push(pothole);
      break;
    case 2:
      x = Math.floor(Math.random() * 290) + 5;
      width = 100;
      height = 50;
      let barricade = new Obstacle(x, y, width, height, r);
      barricade.moveDownForever();
      obsArr.push(barricade);
      break;
  }
}

let totalSpeed = 30;

let obstaclesHit = 0;

document.getElementById("start-button").onclick = function() {
  startGame();
  loopObs();
  let obsHit = document.createElement('h1');
  obsHit.setAttribute('class', 'obstacles-hit')
  obsHit.innerText = `Obstacles Hit: ${obstaclesHit}`;
  document.querySelector('.game-intro').appendChild(obsHit);
  let theSpeed = document.createElement('h1');
  theSpeed.setAttribute('class', 'the-speed');
  theSpeed.innerText = `Current Speed: ${currentSpeed} MPH`
  document.querySelector('.game-intro').appendChild(theSpeed);
};

function startGame() {
  drawImages();
  collisionDetect();
  document.getElementById("start-button").disabled = true;
  requestAnimationFrame(startGame);
}

let timeBetween = 2500;
let currentSpeed = 5;
let obstaclesPassed = 0;
let fallSpeed = 3;
let increaseTheSpeed = false;

function increaseSpeed() {
  document.querySelector('.the-speed').innerText = `Current Speed: ${currentSpeed} MPH`
  timeBetween -= 75;
  currentSpeed += 5;
  if (increaseTheSpeed) {
    fallSpeed += 1;
    increaseTheSpeed = !increaseTheSpeed;
  } else {
    increaseTheSpeed = !increaseTheSpeed;
  }
  
  loopObs();
}


function loopObs () {
  let obs = setInterval(() => {
    obstaclesPassed += 1;
      createObstacle();
    if (obstaclesPassed === 2) {
      obstaclesPassed = 0;
      clearInterval(obs);  
      if (timeBetween > 100) {
        increaseSpeed();
      } else {
        alert('You Win!!!')
      }
      
    }
  }, timeBetween);
}

function removeObstacle (i) {
  obsArr.splice(i, 1);
}


function collision() {
  obstaclesHit += 1;
  timeBetween += 300;
  currentSpeed -= 10;
  document.querySelector('.obstacles-hit').innerText = `Obstacles Hit: ${obstaclesHit}`;
}

function collisionDetect(){
  obsArr.forEach((obs, i)=>{    
  if(userCar.x <= obs.x + obs.width && userCar.x + userCar.width >= obs.x 
      && userCar.y <= obs.y + obs.height && userCar.y + userCar.height >= obs.y){
          collision();
          removeObstacle(i);
       }
  })
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
  }
}


