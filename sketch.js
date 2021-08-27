var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('ballon/height');
  balloonPosition.on("value",readposition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
if (position!=undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    ChangeHeight(-5,0)
    balloon.scale=balloon.scale
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    ChangeHeight(+5,0)
   balloon.scale=balloon.scale
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    ChangeHeight(0,-5)
    balloon.scale=balloon.scale-0.01
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    ChangeHeight(0,5)
    balloon.scale=balloon.scale+0.01
  }}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}
function ChangeHeight(x,y){
    database.ref('ballon/height').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readposition(data){
  position = data.val()
  console.log(position) 
   balloon.x=position.x;
   balloon.y=position.y;
}

function showError(){
  console.log("Error in writing to the database")
}
