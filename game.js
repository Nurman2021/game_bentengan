



let character = document.getElementById("character");
let enemy = document.getElementById("enemy");
let leftBtn = document.getElementById("left-btn");
let upBtn = document.getElementById("up-btn");
let rightBtn = document.getElementById("right-btn");
let downBtn = document.getElementById("down-btn");
let bendera = document.getElementById("finish");
let dodgeBtn = document.getElementById("dodge-btn");

let startBtn = document.getElementById("startButton");
let isRunning = false;
let soudtrack = document.getElementById("ost")




// frame saat ini
let isDodging = false;
let dodgeDistance = 100;
let dodgeDuration = 500; 
let moveDelay = 100;

// total frame
let totalFrame = 1560;
let moveIntervalId;


var player = document.getElementById("player");

startBtn.addEventListener("click", function(){
    setInterval(moveEnemyTowardsPlayer, 30);
    soudtrack.play();
    toggleFullscreen();
    runAnimation(enemy, 30, 1560 );
})


let animationRunning = false;
// runAnimation(enemy);


// =============================================================== controller =======================================================================
// Ukuran langkah karakter
let stepSize =50; 

leftBtn.addEventListener("touchstart", function(){
   
    moveIntervalId = setInterval(()=>{
        moveCharacter(-stepSize, 0);
        characterDirection(character, 'left');
     }, moveDelay);
     clean();

});

upBtn.addEventListener("touchstart", function(){
    moveIntervalId = setInterval(()=>{
        moveCharacter(0, -stepSize);
     }, moveDelay);
     clean();
});

rightBtn.addEventListener("touchstart", function(){
    moveCharacter(stepSize, 0);
    if(!animationRunning){
        animationRunning = true;
        runAnimation(character, 40, 1560);
    }

 moveIntervalId = setInterval(()=>{
    moveCharacter(stepSize, 0);
    characterDirection(character, 'right');
 }, moveDelay);

 clean();
    // startAnimation();
});

downBtn.addEventListener("touchstart", function(){
    
    moveIntervalId = setInterval(()=>{
        moveCharacter(0, stepSize);
     }, moveDelay);
     clean();
})

dodgeBtn.addEventListener("click", function(){
    dodgeBackwards();
})

function clean(){
    document.addEventListener('touchend', () => {
        clearInterval(moveIntervalId);
      });
}


// character direction

function characterDirection(element, direction){
    if (direction === 'right'){
      element.style.transform = 'scaleX(1)';
    }else if (direction === 'left'){
      element.style.transform = 'scaleX(-1)';
  
    }
     
  }


// =============================================================== controller-end =======================================================================



// =============================================================== enemy movement =======================================================================



let enemyMovementSpeed = 2;
function moveEnemyTowardsPlayer(){

  
  let playerPosition = character.getBoundingClientRect();
  let enemyPosition = enemy.getBoundingClientRect();

  let playerX = playerPosition.left;
  let playerY = playerPosition.top;

  let enemyX = enemyPosition.left;
  let enemyY = enemyPosition.top;

  let dx = playerX - enemyX;
  let dy = playerY - enemyY;

  let jarak = Math.sqrt(dx*dx + dy*dy);


  let vx = (dx / jarak)*enemyMovementSpeed;
  let vy = (dy / jarak)*enemyMovementSpeed;

  if (jarak>enemyMovementSpeed){
      enemy.style.left = enemyX + vx + 'px';
      enemy.style.top = enemyY + vy + 'px';
  } 

  if(enemyPosition.left>playerPosition.left){
    enemy.classList.add("flipped");
  } else {
    enemy.classList.remove("flipped");
  }
  
}



// =============================================================== enemy movement-end =======================================================================

let isCollisionOccurred = false;
// =============================================================== player movement =======================================================================
function moveCharacter(deltaX, deltaY){
    const characterPosition = character.getBoundingClientRect();
    const benderaPosition = bendera.getBoundingClientRect();
    const enemyPosition = enemy.getBoundingClientRect();


    let characterX = characterPosition.left;
    let characterY = characterPosition.top;

    let newCharacterX = characterX + deltaX;
    let newCharacterY = characterY + deltaY;



    if (newCharacterX >= 0 && newCharacterX + characterPosition.width <= window.innerWidth){
        character.style.left = newCharacterX + "px";
    }

    if (newCharacterY >= 0 && newCharacterY + characterPosition.height <= window.innerHeight){
        character.style.top = newCharacterY + "px";
    }


    if(isColliding(characterPosition, benderaPosition)){
        alert('YOU WIN!!!');
        isCollisionOccurred = true;
        return;
    }
    if(isColliding(characterPosition, enemyPosition)){
        alert('YOU LOSE');
        isCollisionOccurred = true;
        return;
    }



    function isColliding(characterPosition, benderaPosition){
        return (
            characterPosition.left < benderaPosition.right && 
            characterPosition.right > benderaPosition.left &&
            characterPosition.top < benderaPosition.bottom &&
            characterPosition.bottom > benderaPosition.top
        );
    }
 
}

// =============================================================== player movement-end =======================================================================




// =============================================================== player skills =======================================================================
// dodge function 
function dodgeBackwards(){
    if(!isDodging){
        isDodging = true;
        let playerPosition = character.getBoundingClientRect();
        let playerX = playerPosition.left;
        let targetX = playerX - dodgeDistance;

        let startTime = null;

        function dodgeAnimmation(timestamp){
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            let newX = playerX - (progress / dodgeDuration) * dodgeDistance;

            if (newX <= targetX){
                newX = targetX;
                isDodging = false;
            }
            
            if (playerX >= 0 && targetX + playerPosition.width <= window.innerWidth){

                character.style.left =  newX + 'px';
            }
 
            if(isDodging){
                requestAnimationFrame(dodgeAnimmation);
            }

        }

        requestAnimationFrame(dodgeAnimmation);
    }

}
// =============================================================== player skills-end =======================================================================




let tID;

function runAnimation(media, playSpeed, frameTotal){
    let currentFrame = 120;
    const interval = playSpeed;
    tID = setInterval (()=>{

  
    media.style.backgroundPosition = `-${currentFrame}px 0px`;
    if (currentFrame < frameTotal){
        currentFrame = currentFrame + 120;
    } else {
        currentFrame = 120;
    }
}, interval);
}


// =============================================================== fullscreen  =======================================================================
function toggleFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  }
// =============================================================== fullscreen-end =======================================================================





