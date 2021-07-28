var airplane, airplaneImg;
var sky, skyImg;
var seagul, seagulImg, seagulG;
var nuke, nukeImg, nukeG;
var distance=0, speed=0, altitude=20000;
var gameOver, gameOverImg;
var planeBlowUp, checkPointSound, airplaneSound;

var PLAY=1;
var END=0;
var gameState= 1;

function preload(){
  airplaneImg= loadImage("airplane3.png");
  skyImg= loadImage("sky2.jpg");
  seagulImg= loadImage("Eagle5.png");
  gameOverImg= loadImage("gameOver.png");
  airplaneSound = loadSound("airplaneSound.mp3");
  planeBlowUp= loadSound("mixkit-fast-game-explosion-1688.wav");
  checkPointSound= loadSound("mixkit-arcade-score-interface-217.wav");
  nukeImg= loadImage("Nuke3.png")
}

function setup() {
  createCanvas(600,600);
  sky = createSprite(300,300);
  sky.addImage(skyImg);
  //sky.velocityX=-2;
  sky.scale=3;
  
  airplane = createSprite(100,300);
  airplane.addImage(airplaneImg);
  airplane.scale=0.4;
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;
  gameOver.visible=false;
  
  seagulG=new Group();
  nukeG=new Group();
}

function draw() {
  background(0);
  x = displayWidth - airplane.distance;

  drawSprites();
  fill("black");
  textSize(15);
  text("SCORE = " + distance,480,50);
  fill("white");
  text("SPEED = " + speed,20,590);
  text("ALTITUDE = " + altitude,450,590);
  
  console.log(gameState);
  
  
  if(gameState===PLAY){
    
  distance=distance + Math.round(getFrameRate()/50);
  sky.velocityX = -(3 + 1.5*distance/200);
    
    
  if(distance>=300){
    speed=speed + Math.round(getFrameRate()/50);
  }
    
  if(distance>0 && distance%200 === 0){
    checkPointSound.play();
  }
   
    if(sky.x<130){
    sky.x=width/2;
  }
    
    if(airplane.isTouching(seagulG)){
    gameState=END;
    planeBlowUp.play();
    seagulG.destroyEach();
    sky.velocityX=0;
    nukeG.destroyEach();
  }
    
    if(airplane.isTouching(nukeG)){
      gameState=END;
      planeBlowUp.play();
      nukeG.destroyEach();
      sky.velocityX=0;
      seagulG.destroyEach();
    }
    
    airplane.y=World.mouseY;
    airplane.x=World.mouseX;
    spawnSeaguls();
    spawnNukes();
  }
  else if(gameState===END){
    gameOver.visible=true;
    
    if(mousePressedOver(gameOver)){
      reset();
    }
  }
  
}

function reset(){
  gameState=PLAY;
  distance=0;
  speed=0;
  gameOver.visible=false;
  seagulG.destroyEach();
}

function spawnSeaguls(){
  if(World.frameCount %100 == 0){
  seagul = createSprite(550,Math.round(random(50,500)));
  seagul.addImage(seagulImg);
  seagul.scale=0.3;
  seagul.velocityX=-4;
  seagul.lifetime=170;
  seagulG.add(seagul);
  x = displayWidth - seagul.distance;
  }
}

function spawnNukes(){
  if(World.frameCount %150 == 0){
    nuke = createSprite(200,-50);
    nuke.addImage(nukeImg);
    nuke.scale=0.25;
    nuke.velocityY=3;
    nuke.lifetime=200;
    nuke.x=Math.round(random(120,400));
    nukeG.add(nuke);
    y = displayHeight - nuke.distance;
  }
}