//lourdes.espinodelcastillo@gmail.com

var ground ,fakeGround;
var trex ,trex_running;
var score = 0;
var play = 1;
var end = 0;
var gameState = play;
var obstaclesGroup;
var gameOver;
var restart;
var trex_collided;
var checkpoint;
var die;
var jump;
var touches;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundImage = loadImage("ground2.png");
rCloud = loadImage("cloud.png");
rCactus1 = loadImage("obstacle1.png");
rCactus2 = loadImage("obstacle2.png");
rCactus3 = loadImage("obstacle3.png");
rCactus4 = loadImage("obstacle4.png");
rCactus5 = loadImage("obstacle5.png");
rCactus6 = loadImage("obstacle6.png");
gameOverI = loadImage("gameOver.png");
restartI = loadImage("restart.png");
trex_collided = loadImage("trex_collided.png");
checkpoint = loadSound("checkpoint.mp3");
die = loadSound("die.mp3");
jump = loadSound("jump.mp3");

}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
 trex = createSprite(50,height-160,20,50);//crear sprite de Trex
 trex.addAnimation("running",trex_running);
 trex.scale = 0.5;
 trex.x = 150;

 trex.addAnimation("collided",trex_collided);

 ground = createSprite(width/2,height-10,125);
 ground.addImage("ground",groundImage);

 fakeGround = createSprite(200,190,400,10);
 fakeGround.visible = false;
 var rand = Math.round(1,100);

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverI);
 gameOver.scale = 0.5;

 restart = createSprite(300,140);
 restart.addImage(restartI);
 gameOver.scale = 0.5;

 //console.log("esto es "+ gameState);

 trex.setCollider("circle", 0, 0, 25);

 trex.debug=true; //si lo cambio a true puedo ver el colisionador

 obstaclesGroup = new Group();

 cloudGroup = new Group();

 //trex.setCollider("rectangle", 0, 0, 40, trex.height);
}

function draw(){
  background("white");
  
  text("Score = " + score,500,50);
  fill("gray");
  
  
  
  //console.log(trex.y);

  //console.time();
  //console.timeEnd();

  if (gameState === play){
    gameOver.visible=false;
    restart.visible=false;
    ground.velocityX = -5;

    score = score + Math.round(frameCount/60);

    if(ground.x < 0){
      ground.x = ground.width/2;
  
    }

    if ((touches.length > 0 || keyDown("space")) && trex.y >= height-164){
      trex.velocityY = -12;
      jump.play();
      touches=[];
  
    }
  
    if (score>0&&score%100===0){
      checkpoint.play();
      //ground.velocityX=9+3*score/100;
      obstaclesGroup.velocityX=9+3*score/100;
      cloudGroup.velocityX=9+3*score/100;
    }
    trex.velocityY = trex.velocityY+0.8


    randomClouds();

    randomCactus();

    

    


    if (obstaclesGroup.isTouching(trex)){
      //trex.velocityY=-12//modo bot
      gameState = end;
      die.play();
    }
  } 
 else if (gameState === end){
  ground.velocityX = 0;
  gameOver.visible=true;
  restart.visible=true;
  obstaclesGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
  trex.velocityY = 0;
  
 }

 trex.collide(fakeGround);

  if (mousePressedOver(restart)){
    //console.log("reinicia el juego");
    reset();

  }

  

  


  drawSprites();

}
function randomClouds(){
 
  if (frameCount%60===0){
    var cloud = createSprite(600,100,40,10);
    cloud.velocityX = -2;
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.6;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifetime=350; 
    
    cloud.addImage(rCloud);

    cloudGroup.add(cloud);
  }
}
function randomCactus(){
  if (frameCount%60===0){
    var cactus = createSprite(600,175,10,40);
    cactus.velocityX = -5;
    var rand = Math.round(random(1,6));
    switch (rand) {
      case 1: cactus.addImage(rCactus1);
        
        break;

        
      case 2: cactus.addImage(rCactus2);
        
        break;


      case 3: cactus.addImage(rCactus3);
        
        break;


      case 4: cactus.addImage(rCactus4);
        
        break;


      case 5: cactus.addImage(rCactus5);
        
        break;


      case 6: cactus.addImage(rCactus6);
        
        break;
        
    
      default:
        break;
    }
    cactus.scale=0.5;
    cactus.lifetime=300;

    obstaclesGroup.add(cactus);
  }
  
}
function reset(){
  score=0;
  cloudGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  gameState=play;


}