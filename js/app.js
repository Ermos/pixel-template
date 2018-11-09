/***********************
 *
 *  Configuration
 *
 ***********************/

// Decor Element
var content = document.querySelector('#content');
var background = content.querySelector('.content__background');
var character = content.querySelector('.character');
var box = content.querySelectorAll('.content__box');

// Movement Element
var moveLeft = document.querySelector('.content__left');
var moveRight = document.querySelector('.content__right');

// Decor Information
var boxWidth = box[0].offsetWidth;

// Session Information
var speed = 10;
var maxCursor = -box.length * boxWidth - boxWidth;
var movementId = null;
var menuPosition = 1;
var backgroundPosition = background.offsetLeft;
var minPosition = 0;
var maxPosition = boxWidth + speed - background.offsetWidth;

/***********************
 *
 *  Function
 *
 ***********************/

// Update the background position
function backgroundPositionUpdate(){
    background.style.left = backgroundPosition + 'px';
}

/*
 * Give animation class to character
 * @param direction => [left or right] ; toggle => [add or remove]
 */
function movementStyle(direction, toggle){

    character.classList.remove('character--coming');

    if(direction === "left"){

        if(toggle === "add"){
            character.classList.add('character--left');
            character.classList.add('character--walk');
        }else if(toggle === "remove"){
            character.classList.remove('character--walk');
        }

    }else if(direction === "right"){

        character.classList.remove('character--left');

        if(toggle === "add"){
            character.classList.add('character--walk');
        }else if(toggle === "remove"){
            character.classList.remove('character--walk');
        }

    }

}

/*
 * Move the background
 * @param direction => [left or right]
 */
function movement(direction){

    var startPosition = backgroundPosition;
    var resetPosition = false;

    if(movementId !== null){
        return;
    }

    if(direction === "left"){

        var Position = startPosition+boxWidth;
        movementStyle('left', 'add');

        if(menuPosition === 1){
            menuPosition = box.length;
        }else{
            menuPosition--;
        }

        movementId = setInterval(function(){

            if(Position >= minPosition){

                if(backgroundPosition >= minPosition){
                    backgroundPosition = maxPosition;
                    return resetPosition = true;
                }

                if(resetPosition === true){
                    if(maxCursor+boxWidth <= backgroundPosition){
                        resetPosition = false;
                        movementStyle('left', 'remove');
                        clearInterval(movementId);
                        return movementId = null;
                    }
                }

            }else{

                if(Position <= backgroundPosition){
                    movementStyle('left', 'remove');
                    clearInterval(movementId);
                    return movementId = null;
                }
            }

            backgroundPosition += speed;
            backgroundPositionUpdate();

        }, 50);

    }else if(direction === "right"){

        var Position = startPosition-boxWidth;
        movementStyle('right', 'add');

        if(menuPosition === box.length){
            menuPosition = 1;
        }else{
            menuPosition++;
        }

        movementId = setInterval(function(){

            if(Position <= maxPosition){

                if(backgroundPosition <= maxPosition){
                    backgroundPosition = minPosition;
                    return resetPosition = true;
                }

                if(resetPosition === true){
                    if(-boxWidth >= backgroundPosition){
                        resetPosition = false;
                        movementStyle('right', 'remove');
                        clearInterval(movementId);
                        return movementId = null;
                    }
                }

            }else{
                if(Position >= backgroundPosition){
                    movementStyle('right', 'remove');
                    clearInterval(movementId);
                    return movementId = null;
                }
            }

            backgroundPosition -= speed;
            backgroundPositionUpdate();

        }, 50);

    }

}



/***********************
 *
 *  Listener
 *
 ***********************/

moveLeft.addEventListener('click', function(){
    movement('left');
});

moveRight.addEventListener('click', function(){
    movement('right');
});