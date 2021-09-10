var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["1c9a3dfe-5dc3-4ec0-8443-ab7a9c32b8c4","468ecd26-a448-4f19-8638-ca2c803a5021"],"propsByKey":{"1c9a3dfe-5dc3-4ec0-8443-ab7a9c32b8c4":{"name":"ball","sourceUrl":"assets/api/v1/animation-library/gamelab/0g3OdHzUFOX2YJG_syVQcF2OsFD9taIo/category_sports/eightball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"0g3OdHzUFOX2YJG_syVQcF2OsFD9taIo","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/0g3OdHzUFOX2YJG_syVQcF2OsFD9taIo/category_sports/eightball.png"},"468ecd26-a448-4f19-8638-ca2c803a5021":{"name":"court_1","sourceUrl":"assets/api/v1/animation-library/gamelab/T.BLfNn.3XTblWtBQ7GC1tSx4_8IsEJV/category_backgrounds/background_court.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"T.BLfNn.3XTblWtBQ7GC1tSx4_8IsEJV","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/T.BLfNn.3XTblWtBQ7GC1tSx4_8IsEJV/category_backgrounds/background_court.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//background
var bg= createSprite(400,400,1000,1000);
bg.setAnimation("court_1");
bg.scale=2;

//player paddle
var paddle= createSprite(200,390,80,10);
paddle.shapeColor= "green";

//ball
var ball= createSprite(200,345,20,20);
ball.setAnimation("ball");
ball.scale=0.07;

//walls to be destroyed
var wall1= createSprite(70,40,100,20);
wall1.shapeColor="black";
var wall2= createSprite(320,115,100,20);
wall2.shapeColor="black";
var wall3= createSprite(225,170,100,20);
wall3.shapeColor="black";
var wall4= createSprite(60,245,100,20);
wall4.shapeColor="black";
var wall5= createSprite(200,10,100,20);
wall5.shapeColor="black";
var wall6= createSprite(320,250,100,20);
wall6.shapeColor="black";

//walls for bouncing off
var wall7= createSprite(280,60,100,20);
wall7.shapeColor="red";
var wall8= createSprite(130,130,100,20);
wall8.shapeColor="red";
var wall9= createSprite(85,200,100,20);
wall9.shapeColor="red";
var wall10=createSprite(265,215,100,20);
wall10.shapeColor="red";
var wall11= createSprite(135,285,100,20);
wall11.shapeColor="red";

var gameState= "serve";
var score= 0;
var lives= 1;

function draw() {
  drawSprites();

//boundaries
  createEdgeSprites();
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(topEdge);
 ball.bounceOff(wall7);
  ball.bounceOff(wall8);
  ball.bounceOff(wall9);
  ball.bounceOff(wall10);
  ball.bounceOff(wall11);
  ball.bounceOff(paddle)
  
  //to score points
  if(ball.isTouching(wall1)){
    wall1.destroy();
    score= score+1;
   playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  if(ball.isTouching(wall2)){
    wall2.destroy();
    score= score+1;
  playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  if(ball.isTouching(wall3)){
    wall3.destroy();
    score= score+1;
  playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  if(ball.isTouching(wall4)){
    wall4.destroy();
    score= score+1;
  playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  if(ball.isTouching(wall5)){
    wall5.destroy();
    score= score+1;
  playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  if(ball.isTouching(wall6)){
    wall6.destroy();
    score= score+1;
  playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3");
  }
  
  //beginning
  if(gameState== "serve"){
    fill("brown");
    textSize(18);
    text("Welcome! You have to destroy the black blocks",10,200);
    text("Press ENTER to start",100,230);
    if(keyDown("ENTER")){
    gameState= "play";
    ball.velocityY=3;
    ball.velocityX=2;
    }
  }
  paddle.x=World.mouseX;
  //while playing
  if(gameState== "play"){
    
    if(ball.y>400){
    lives= lives-1;
    ball.x=200;
    ball.y=345;
    ball.velocityX=0;
    ball.velocityY=0;
    gameState= "end";
  }
    if(ball.y>400 || score==6){
   gameState="end";
    }
  }
  //ending
  if(gameState== "end"){
    ball.velocityX=0;
   ball.velocityY=0;
   paddle.x=0;
   textSize(18);
  fill("brown");
   text("Game Over!", 130,200);
   if(score==6){
     text("You have won!",120,230);
   }
   if(lives==0){
     text("You have lost. Try again? Press SPACE to restart.",5,230);
     if(keyDown("space")){
     gameState="serve";
     ball.x=200;
     ball.y=345;
     paddle.x=200;
     paddle.y=390;
     }
   }
  }
  
  //adding scores
  fill("green");
  stroke("green");
textSize(18);
 text("Score: "+ score , 20, 20);
 
 //adding lives
 fill("green");
stroke("green");
textSize(18);
 text("Lives: "+ lives , 330, 20);
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
