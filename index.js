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
        
        if(this.direction.x === 0 && this.direction.y === 1){
            this.y += 20;
        }
        else if(this.direction.x === 0 && this.direction.y === -1){
            this.y -= 20; 
        }
        else if(this.direction.x === -1 && this.direction.y === 0){
            this.x -= 20; 
        }
        else if(this.direction.x === 1 && this.direction.y === 0){
            this.x += 20;
        }

        

    }
}


class Apple{
    constructor(){

    }
}

const snake = new Snake();
const apple = new Apple();


const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(snake.x, snake.y, 15, 15);
}

document.addEventListener('keydown', (key)=>{
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
    }, 250);
}

gameLoop();