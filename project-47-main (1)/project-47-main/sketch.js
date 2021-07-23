var player,playerImg;
var laser,laserImg,laserGroup;
var obstacle,obstacleImg,obstacleGroup;
var ground,groundImg;
var edges;
var score;
var life;
var gameState;

function preload(){
  playerImg=loadImage("player.png");
  laserImg=loadImage("laser.png");
  obstacleImg=loadImage("obstacle.png");
  groundImg=loadImage("sky.png");
}


function setup() {
  createCanvas(750,400);
  ground=createSprite(375,200,800,400);
  ground.addImage(groundImg);
  ground.scale=0.75;

  player=createSprite(375,300,50,50);
  player.addImage(playerImg);
  player.scale=0.15;

  score=0;
  life=3;
  gameState="play";

  laserGroup=new Group();
  obstacleGroup=new Group();

  edges=createEdgeSprites();

}

function draw() {
  background(255,255,255);  

  if(gameState==="play"){
  player.collide(edges);

  if(keyDown("right")){
    player.x=player.x+7;
  }
  if(keyDown("left")){
    player.x=player.x-7;
  }
  if(keyDown("up")){
    player.y=player.y-7;
  }
  if(keyDown("down")){
    player.y=player.y+7;
  }

  if(laserGroup.collide(obstacleGroup)){
    laserGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=score+2;
  }

  if(player.collide(obstacleGroup)){
    obstacleGroup.destroyEach();
    life=life-1;
  }

  if(life===0){
    gameState="end";
    player.destroy();
  }

  spawnObstacles();
  spawnLaser();
}


  drawSprites();

  textSize(20);
  fill("red");
  text("score : "+score,20,50);

  textSize(20);
  fill("white");
  text("life : "+life,650,50);

if(gameState==="end"){
  textSize(50);
  fill("red");
  text("GOOD JOB",230,200);

  textSize(20);
  fill("white");
  text("You Scored : "+score+" points",270,235);
}


}

function spawnObstacles(){
  if(frameCount%75===0){
  obstacle=createSprite(random(50,700),-100,50,50);
  obstacle.addImage(obstacleImg);
  obstacle.scale=0.1;
  obstacle.velocityY=5;
  obstacle.lifetime=900;
  obstacleGroup.add(obstacle);
  obstacle.setCollider("rectangle",0,0,obstacle.width,50);
  }
}

function spawnLaser(){
  if(keyWentDown("space")){
    laser=createSprite(player.x,player.y-40,10,10);
    laser.addImage(laserImg);
    laser.scale=0.5;
    laser.velocityY=-8;
    laser.lifetime=500;
    laserGroup.add(laser);
  }
}