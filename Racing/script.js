let canvas = document.querySelector('canvas')

let ctx = canvas.getContext('2d')

canvas.width = 341
canvas.height = 600

laneWidth = 87
laneGap = 20
gameOver = false

class Obstacle {
    constructor(lane, speed){
        this.scaleFactor = 3
        this.lane = lane
        this.image = new Image()
        this.image.src = 'obstacle.png'
        this.image.onload = () => {
            this.width = this.image.width * this.scaleFactor
            this.height = this.image.height * this.scaleFactor
            this.y = -this.height
        }
        this.speed = speed
    }

    draw(){
        ctx.drawImage(this.image, laneGap + (this.lane-1) * (this.width+laneGap), this.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.y += this.speed
        if(this.y > canvas.height){
            let index = obstacles.findIndex((obstacle) => {
                return obstacle == this
            })
            obstacles.splice(index, 1)
        }
    }
}

class Player{
    constructor(){
        this.scaleFactor = 3
        this.lane = 2
        this.image = new Image()
        this.image.src = 'player.png'
        this.image.onload = () => {
            this.width = this.image.width * this.scaleFactor
            this.height = this.image.height * this.scaleFactor
            this.y = canvas.height - this.height - 20
        }
    }

    draw(){
        ctx.drawImage(this.image, laneGap + (this.lane-1) * (this.width+laneGap), this.y, this.width, this.height)
    }

    update(obstacles){
        this.draw()
        for(let i = obstacles.length - 1; i >= 0; i--){
            if(obstacles[i].lane == this.lane && obstacles[i].y + obstacles[i].height > this.y && obstacles[i].y < this.y + this.height){
                gameOver = true
            }
        }
    }
}

speed = 8

function spawnEnemy(){
    if(!gameOver){
        clearInterval(interval)
        obstacles.push(new Obstacle(Math.ceil(Math.random() * 3), speed))
        if(spawnRate > 500){
            spawnRate -= 5
        }
        speed += 0.02
        interval = setInterval(spawnEnemy, spawnRate)
    }
}
let player = new Player()
let obstacles = []
let spawnRate = 1000
let score = 0

interval = setInterval(spawnEnemy, spawnRate)

function animate(){
    ctx.clearRect(0, 0 , canvas.width, canvas.height)
    score++
    let scoreCounter = document.getElementById('Score')
    scoreCounter.innerHTML = score
    player.update(obstacles)
    for(let i = obstacles.length - 1; i >= 0; i--){
        obstacles[i].update()
    }
    if(!gameOver){
        requestAnimationFrame(animate)
    }
}

animate()

addEventListener('keydown', (e) => {
    if(e.key == 'ArrowLeft' && player.lane > 1){
        player.lane -= 1
    }else if(e.key == 'ArrowRight' && player.lane < 3){
        player.lane += 1
    }
})