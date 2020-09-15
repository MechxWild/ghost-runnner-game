Play = 1
End = 0
var gameState = Play
var Ghost,GhostImg
var tower,towerimg
var door,doorImg,plank,plankImg
var invisiblebar
var spookingcreepySound
var ghostjumping



function preload(){
  towerimg = loadImage("tower.png");
  GhostImg = loadImage("ghost-standing.png")
  doorImg = loadImage("door.png")
  plankImg = loadImage("climber.png")
  spookingcreepySound = loadSound("spooky.wav")
  ghostjumping = loadImage("ghost-jumping.png");
}


function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300,600,600);
  tower.addImage("tower image",towerimg);
  tower.velocityY = 2;
  Ghost = createSprite(300,300,10,10);
  Ghost.addImage("Ghost standing",GhostImg);
  Ghost.scale = 0.5;
  Ghost.setCollider("rectangle",-10,35,150,250)
  doorGroup = new Group();
  plankGroup = new Group();
  invisibleGroup = new Group();
  //spookingcreepySound.loop();
  
  
  
  
}

function draw(){
  
  if(gameState === Play){
  if(tower.y>500){
  tower.y = 300;
  }
  if(keyDown("left_arrow")){
  Ghost.x = Ghost.x-3
  }
  if(keyDown("right_arrow")){
  Ghost.x = Ghost.x+3
  }
  Ghost.velocityY = Ghost.velocityY+0.3
  if(plankGroup.isTouching(Ghost)){
  Ghost.velocityY = 0;
  
  }
    doorSpawn();
  jumping();
    drawSprites();
  }
  if(Ghost.isTouching(invisibleGroup)||Ghost.y>600){
    Ghost.destroy();
    gameState = End;
   }
 if(gameState === End){
   
   tower.velocityY = 0
 textSize(50);
 stroke("yellow");
 fill("red");
text("game over",200,300);
   
 }
  
  
  
  

}

function jumping(){
  if(keyDown("space")){
  Ghost.velocityY = -4;
  }
}

function doorSpawn(){
if(frameCount%300===0){
door = createSprite(Math.round(random(100,500)),  0,10,10)
door.addImage("door",doorImg);
door.velocityY = 2;
door.lifetime=300;
doorGroup.add(door);
  
plank = createSprite(door.x,door.y+50,10,10);
plank.addImage("climber",plankImg)
plank.velocityY = 2;
plank.lifetime = 300;
plankGroup.add(plank);
  
invisiblebar=createSprite(plank.x,plank.y+10,plank.width,10);
invisiblebar.velocityY = 2;
invisiblebar.lifetime = 300;
invisiblebar.visible = false;
invisibleGroup.add(invisiblebar);
  
door.depth = Ghost.depth
Ghost.depth = Ghost.depth+1

}
  
}


