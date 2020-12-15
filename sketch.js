var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkeyImage;
var banana, bananaImage, obstacle, obstacleImage;
var ground, invisibleGround;
var bananaGroup, obstacleGroup;
var survivalTime = 0;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  ground = createSprite(300,350,1200,10);
  
  invisibleGround = createSprite(300,360,600,10);
  invisibleGround.visible = false;
  
  monkey = createSprite(50,300,100,200);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("colliding", monkey_collided);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("white");
  
  if(ground.x < 0){
      ground.x = ground.width/2;
  }
  
  if(gameState == PLAY){
  ground.velocityX = -4;
    
  monkey.addAnimation("colliding",monkey_collided);
    
  if(keyDown("space")&&monkey.y >= 250){
      monkey.velocityY = -12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
    
  spawnBananas();
  spawnObstacles();
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
  }
    
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
}
  
  if(gameState == END){
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.addAnimation("running", monkey_running);
    stroke("green");
    fill("black");
    textSize(25);
    text("GAME OVER!",50,50);
    textSize(12);
    stroke("black");
    text("Press R to RESTART",80,80);
    if(keyDown("r")){
      gameState = PLAY;
      restart();
    }

  }

  monkey.collide(invisibleGround);
  stroke("green");
  textSize(15); 
  fill("black");
  text("Survival Time: "+ survivalTime,450,50);

  drawSprites();
  
}

function spawnBananas(){
  if(World.frameCount%80 == 0){
    banana = createSprite(600,Math.round(random(120,200)),20,40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 75;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(World.frameCount%300 == 0){
    obstacle = createSprite(600,305,50,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 90;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,obstacle.height/3);
    obstacleGroup.add(obstacle);
  }
}

function restart(){
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  survivalTime = 0;
}






