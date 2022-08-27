var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


class Snake{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.tail = [{x:this.x, y:this.y}];
        this.direction = [{x:1, y:0}];
    }

    move(){
        let newReaction = {};

        if(this.direction[0].x === 0 && this.direction[0].y === 1){
            newReaction = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + 20
            } 
        }
        else if(this.direction[0].x === 0 && this.direction[0].y === -1){
            newReaction = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - 20
            }  
        }
        else if(this.direction[0].x === -1 && this.direction[0].y === 0){
            newReaction = {
                x: this.tail[this.tail.length - 1].x - 20,
                y: this.tail[this.tail.length - 1].y
            }  
        }
        else if(this.direction[0].x === 1 && this.direction[0].y === 0){
            newReaction = {
                x: this.tail[this.tail.length - 1].x + 20,
                y: this.tail[this.tail.length - 1].y
            } 
        }
        
        this.tail.push(newReaction);
        if(!isTouching()){
            this.tail.shift();
            console.log('entro en el shift')
        }
        
        
    }

    
}

const positionRound20 = () =>{
    let number = Math.floor(Math.random()*480);
    return Math.ceil(number/20)*20
}

class Apple{
    constructor(){
        this.position = {x:positionRound20(), y: positionRound20()}
       
    }

    generate(){
        let touch = isTouching();
        while(touch){
            this.position = {x:positionRound20(), y: positionRound20()}
            touch = isTouching();
        }
        

        createSquare(this.position.x, this.position.y, 15, 15, "#FF0000");
        
    }


}

const snake = new Snake(0, 0);
const apple = new Apple()


const isTouching = () => {
    let isTouching;
    let touchingSquare;

    touchingSquare = snake.tail.filter(obj => {
        if(obj.x === apple.position.x && obj.y === apple.position.y){
            return obj
        }}
        
    );

    if(touchingSquare.length === 0){
        isTouching = false;
    }
    else{
        isTouching = true;
    }
    

    return isTouching;
}

const createSquare = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const update = () => {


    if(snake.tail[snake.tail.length - 1].x < 0 || snake.tail[snake.tail.length - 1].y < 0){
        snake.tail = [{x:snake.x, y:snake.y}];
        snake.direction = [{x:1, y:0}];
    }
    else if(snake.tail[snake.tail.length - 1].x >= 500 || snake.tail[snake.tail.length - 1].y >= 500){
        snake.tail = [{x:snake.x, y:snake.y}];
        snake.direction = [{x:1, y:0}];
    }


    createSquare(0, 0, canvas.width, canvas.height, "black");
    for (let i = 0; i < snake.tail.length; i++) {
        createSquare(snake.tail[i].x, snake.tail[i].y, 15, 15, "#99FF99");
    }
    
    if (isTouching()){
        console.log('menjadaaa')
        apple.generate();
        
    }
    else{
        createSquare(apple.position.x, apple.position.y, 15, 15, "#ff000");
        let headX = snake.tail[snake.tail.length - 1].x;
        let headY = snake.tail[snake.tail.length - 1].y;

        for (const position of snake.tail) {
            console.log('head');
            console.log(snake.tail[snake.tail.length - 1]);
            console.log(position);
            if(snake.tail.length === 1){
                break;
            }

            else if(position.x === headX && position.y === headY){
                snake.tail = [{x:snake.x, y:snake.y}];
                snake.direction = [{x:1, y:0}];
                console.log('game over');
            }
        }
    }

    
    
}

document.addEventListener('keydown', (key)=>{
    if(key.code === "ArrowDown"){
        snake.direction[0].x = 0;
        snake.direction[0].y = 1;
        
        
    }else if(key.code === "ArrowUp"){
        snake.direction[0].x = 0;
        snake.direction[0].y = -1;
        
        
    }else if(key.code === "ArrowLeft"){
        snake.direction[0].x = -1;
        snake.direction[0].y = 0;
        
        
    }else if(key.code === "ArrowRight"){
        snake.direction[0].x = 1;
        snake.direction[0].y = 0;
        
    }
})



const gameLoop = () => {
    setInterval(() => {
        snake.move();
        update();
        
        
    }, 1000);
}

gameLoop();