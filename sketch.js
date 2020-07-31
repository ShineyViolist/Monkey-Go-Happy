//Global Variables

//Images
var bananaImage,obstacleImage,monkeyImage,bgImage;

//Sprites & Score
var player,bg,bananas,obstacles,score,ground,heart1,heart2,heart3;

var gameOverImage, restartImage;

var grav = 0.5;

var lives = 3;

score = 0;

var xc = 0;

var dax = 1;



var gameState = "play";

function preload(){
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bgImage = loadImage("jungle.jpg");
  heartImage = loadImage("heart.png");
  gone = loadImage("gone.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(displayWidth + 171,displayHeight-65);

  //console.log(displayWidth);
  
  //Create Sprites
  bg = createSprite((displayWidth + 171)/2,(displayHeight - 65)/2,displayWidth + 171,displayHeight - 65);
  //bg.addImage(bgImage);
  imageMode(CENTER);
  //bg.scale = 1.5;
  //bg.velocityX = -5;
  
  player = createSprite(50,700,20,20);
  player.addAnimation("monkeyMove",monkeyImage);
  player.scale = 0.2;
  
  bananas = new Group();
  
  obstacles = new Group();
  
  ground = createSprite(player.x,player.y,displayWidth,20);
  ground.visible = false;
  
  heart1 = createSprite(camera.x + 400,50,20,20);
  heart1.addAnimation("alive",heartImage);
  heart1.addAnimation("broken",gone);
  heart1.scale = 1.5;
  
  heart2 = createSprite(camera.x + 430,50,20,20);
  heart2.addAnimation("alive",heartImage);
  heart2.addAnimation("broken",gone);
  heart2.scale = 1.5;

  heart3 = createSprite(camera.x + 460,50,20,20);
  heart3.addAnimation("alive",heartImage);
  heart3.addAnimation("broken",gone);
  heart3.scale = 1.5;
  
  gameOver = createSprite(300,100,20,20)
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,150,20,20)
  restart.addImage(restartImage);
  restart.scale = 0.8
  restart.visible = false;
}


function draw(){
  background("blue");

  ground.x = player.x;

  camera.position.x = player.x + (((displayWidth + 171)/2) - 70);


  image(bgImage,bg.x * dax,bg.y,bg.width,bg.height);

  image(bgImage,((bg.x * dax) + (bg.width - 10)),bg.y,bg.width,bg.height);

  heart1.x = camera.x + 400;
  heart2.x = camera.x + 430;
  heart3.x = camera.x + 460;

  if(player.x % 1750 == 0 && player.x > 0){
    dax = dax + 2;
    //console.log(dax);
  }

  //if(keyDown("space")){
    //gameState = "lose";
  //}


  var da =  bg.x + xc

  //console.log(player.y);

  
  if(gameState == "play"){  

    player.velocityX = 5;

    //xc  = xc - 5;
    
    gameOver.visible = false;
  
    restart.visible = false;

    bg.visible = false;
   
    //bg.velocityX = -5;
    
    if(World.frameCount%90 == 0){
      if(Math.round(random(1,2)) == 1){
        spawnBananas();
      }else{
        spawnObstacles();
      }
    }
  
    for(var i = 0; i<=bananas.length; i++){
      if(player.isTouching(bananas)){
        bananas.get(i).destroy();
        score++;
      }
    }
  } 
 
  for(var g = 0; g<=obstacles.length; g++){
    if(player.isTouching(obstacles)){
      if(lives == 3){
        heart1.changeAnimation("broken");
        player.scale = 0.2;
        obstacles.remove(obstacles.get(g));
      }
      if(lives == 2){
        heart2.changeAnimation("broken");
        player.scale = 0.2;
        obstacles.remove(obstacles.get(g));
      }
      if(lives == 1){
        heart3.changeAnimation("broken");
        gameState = "lose";
      }
      lives--;
    }
  } 
  
  if(keyDown("space") && player.y >= 631){
    player.velocityY = -15; 
  }
  
  player.velocityY = player.velocityY + grav;
  
  /*if(bg.x < -149){
    bg.x = bg.width/2;
  }*/
    player.collide(ground);
  
  switch(score){
          case 5: player.scale = 0.24; 
                   break;
          case 10: player.scale = 0.26;
                   break;
          case 15: player.scale = 0.28;
                  break;
          case 20: player.scale = 0.30; 
                   break;
         default: break;
  }
  if(gameState == "lose"){
    restart.visible = true;
    gameOver.visible = true;
    
    player.velocityY = 0;

    player.velocityX = 0;
    
    bg.velocityX = 0;
    
    obstacles.setVelocityXEach(0);
    
    bananas.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
      score = 0;
      gameState = "play";
      obstacles.destroyEach();
      bananas.destroyEach();
      heart1.changeAnimation("alive",heartImage);
      heart2.changeAnimation("alive",heartImage);
      heart3.changeAnimation("alive",heartImage);
      lives = 2;
    } 
  }
    
  player.collide(ground);
  
  drawSprites();

  textSize(20);
  fill("white");
  text("Score: " + score,camera.x + 500,50);
}

function spawnObstacles(){
  obstacle = createSprite(camera.x + 900,650,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5;
  obstacles.add(obstacle);
}

function spawnBananas(){
   banana = createSprite(900 + camera.x,650,20,20); 
   banana.addImage(bananaImage);
   banana.scale = 0.05;
   banana.velocityX = -5;
   bananas.add(banana);
}