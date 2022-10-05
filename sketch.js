var bg;
var player, playerImg;
var bullet_e, bulletImg;
var missile, missile_e, missileImg, missile_e_img;
var fireBall, fireBall_img;

var bg;

var enemy, enemyImg;

var trig1, trig2;

var health = 100;
var maxHealth = 100;




function preload()
{
  playerImg = loadImage("Assets/TBM-3.png")
  bulletImg = loadImage("Assets/Bullets_01.png")
  missileImg = loadImage("Assets/missile_01.png")
  missile_e_img = loadImage("Assets/missile_02.png")
  fireBall_img = loadImage("Assets/fireBall_01.png")

  bg         = loadImage("Assets/Backgrounds/BG_07.png")

  enemyImg = loadImage("Assets/Enemy_FighterJet_Ba.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  player = createSprite(width/2, height/2 + 270);
  player.addImage("player", playerImg);
  player.scale = 0.5;

  enemy = createSprite(windowWidth/2+600 , windowHeight/2 - 300);
  enemy.addImage("enemy", enemyImg);
  enemy.scale = 0.6

trig1 = createSprite(windowWidth, windowHeight-650)
trig1.scale = 0.7;
trig1.visible = false;

trig2 = createSprite(windowWidth/100, windowHeight-650)
trig2.scale = 0.7;
trig2.visible = false;

}

function draw() {
  background(bg, windowWidth, windowHeight);  

//Health Bar



  
  playerController()
 

  enemyController()

  spawnBullets_p()
  spawnBullets_e()




  updateHealth()
   //checkCollisions()
 

  //console.log(checkCollison)


  drawSprites();
}

function playerController ()
{

  // Locomotion

   if(keyDown(RIGHT_ARROW))
   {
    player.x = player.x + 8
   }

   if(keyDown(LEFT_ARROW))
   {
    player.x = player.x - 8
   }

   if(keyDown(UP_ARROW))
   {
    player.y = player.y - 6
   }

   if(keyDown(DOWN_ARROW))
   {
    player.y = player.y + 6
   }

   //Attacks

   if(keyWentDown("space"))
   {
    // Right wing
     missile = createSprite(player.x + 39, player.y - 29);
     missile.addImage("missile", missileImg)
     missile.scale = 0.08;
     missile.velocityY = -8;
     missile.lifetime = 80;
     
     // Left Wing
     missile = createSprite(player.x - 39, player.y - 29);
     missile.addImage("missile", missileImg)
     missile.scale = 0.08;
     missile.velocityY = -8;
     missile.lifetime = 80;

   }


}



function spawnBullets_p () 
{ 
  if(frameCount % 4 === 0) 
  {
  bullet_p = createSprite(player.x + 37, player.y - 29)
  bullet_p.addImage ("bullet", bulletImg)
  bullet_p.scale = 0.09
  bullet_p.velocityY = -30;
  bullet_p.lifetime = 30;

  bullet_p = createSprite(player.x - 37, player.y - 29)
  bullet_p.addImage ("bullet", bulletImg)
  bullet_p.scale = 0.09
  bullet_p.velocityY = -30;
  bullet_p.lifetime = 30;

}
}


function spawnBullets_e () 
{ 
  if(frameCount % 30)
  {
  if(frameCount % 6 === 0) 
  {
  bullet_e = createSprite(enemy.x + 33, enemy.y + 68)
  bullet_e.addImage ("bullet", bulletImg)
  bullet_e.scale = 0.09
  bullet_e.velocityY = 30;
  bullet_e.lifetime = 30;

  bullet_e = createSprite(enemy.x - 33, enemy.y + 68)
  bullet_e.addImage ("bullet", bulletImg)
  bullet_e.scale = 0.09
  bullet_e.velocityY = 30;
  bullet_e.lifetime = 30;

  if(bullet_e.isTouching(player)) 
  {
    player.destroyed()
  }



  }
}
}

function enemyController () 
{
// locomotion

  if(enemy.isTouching(trig1)) 
  {
    enemy.velocityX = -4
  }

  if(enemy.isTouching(trig2)) 
  {
    enemy.velocityX = 4
  }


//Attack

if(frameCount % 100 === 0) 
{
     // Right wing
     missile_e = createSprite(enemy.x + 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +8;
     missile_e.lifetime = 80;
     
     // Left Wing
     missile_e = createSprite(enemy.x - 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +8;
     missile_e.lifetime = 80;
}
  
 if(frameCount % 300 === 0)
 {

   fireBall = createSprite(enemy.x, enemy.y + 30);
   fireBall.addImage("fireBall", fireBall_img)
   fireBall.scale = 0.09;
   fireBall.velocityY = 5;
   fireBall.lifetime = 90;

 }


}



function updateHealth () 
{

  stroke(0);
  strokeWeight(4);
  noFill();
  rect(10, 10, 200, 20);
  
  noStroke();
  fill(255, 0, 0);
  rect(10, 10, map(health, 0, maxHealth, 0, 200), 20); 
}


