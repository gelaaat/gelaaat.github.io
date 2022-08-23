var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


class Snake{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.tail = [{x:this.x, y:this.y}];
        this.direction = [{x:1, y:0}];
        
    }

    move(){
        let newReaction;

        if(this.direction.x === 0 && this.direction.y === 1){
            newReaction = {
                x: snake.tail[snake.tail.length - 1].x,
                y: snake.tail[snake.tail.length - 1].y + 20
            }
        }
        else if(this.direction.x === 0 && this.direction.y === -1){
            newReaction = {
                x: snake.tail[snake.tail.length - 1].x,
                y: snake.tail[snake.tail.length - 1].y - 20
            } 
        }
        else if(this.direction.x === -1 && this.direction.y === 0){
            newReaction = {
                x: snake.tail[snake.tail.length - 1].x - 20,
                y: snake.tail[snake.tail.length - 1].y
            } 
        }
        else if(this.direction.x === 1 && this.direction.y === 0){
            newReaction = {
                x: snake.tail[snake.tail.length - 1].x + 20,
                y: snake.tail[snake.tail.length - 1].y
            }
        }

        this.tail.push(newReaction);

    }
}

const snake = new Snake();


const createSquare = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const update = () => {
    createSquare(0, 0, canvas.width, canvas.height, "black");
    for (let i = 0; i < snake.tail.length; i++) {
        createSquare(snake.tail[i].x, snake.tail[i].y, 15, 15, "#fff");
    }
    
}

document.addEventListener('keydown', (key)=>{
    console.log(key.code);
    if(key.code === "ArrowDown"){
        snake.direction.x = 0;
        snake.direction.y = 1;
        
        
    }else if(key.code === "ArrowUp"){
        snake.direction.x = 0;
        snake.direction.y = -1;
        
        
    }else if(key.code === "ArrowLeft"){
        snake.direction.x = -1;
        snake.direction.y = 0;
        
        
    }else if(key.code === "ArrowRight"){
        snake.direction.x = 1;
        snake.direction.y = 0;
        
    }
})


const gameLoop = () => {
    setInterval(() => {
        snake.move();
        update();
        
    }, 1000);
}

gameLoop();