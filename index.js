var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


class Snake{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.tail = [{x:this.x, y:this.y}];
        this.direction = [{x:1, y:0}];
        console.log(this.x);
        console.log(this.tail[0]);
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
        this.tail.shift();
        this.tail.push(newReaction);
        
    }
}


class Apple{
    generate(){
        let touch = true;
        let squareTouch;

        while(touch){
            
            let positionApple = [{x:Math.floor(Math.random()*485), y:Math.floor(Math.random()*485)}];

            squareTouch = snake.tail.filter(obj =>{
                if(obj.x === positionApple[0].x && obj.y === positionApple[0].y){
                    return obj;
                }
            });
    
            if(squareTouch){
                continue;
            }
            else{
                touch = false;
            }
        }
        ctx.fillStyle = "red";
        createSquare(positionApple[0].x, positionApple[0].y, 15, 15, "red");

    }


}

const snake = new Snake(10, 10);
const apple = new Apple()

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
        
    }, 500);
}

gameLoop();