function random(min, max) {
    return Math.random() * (max - min) + min;
}

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

class Paddle {
    constructor(x, y, width, height){
        this.x = x,
        this.y = y,
        this.velY = 0
        this.speed = 5
        this.width = width,
        this.height = height,
        this.colour = "white"
        this.dirs = []
        this.score = 0
    }

    draw(ctx){
        ctx.fillStyle = this.colour
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update(ctx){
        console.log(this.dirs)
        if(this.dirs.length > 0){
            this.velY = this.speed * this.dirs[0]
        }else{
            this.velY = 0
        }
        this.y += this.velY
        if(this.y < 0){
            this.y = 0
        }
        if(this.y > 600 - this.height){
            this.y = 600 - this.height
        }
        this.draw(ctx)
    }
}

class Ball {
    constructor(x, y, radius){
        this.startAngle = random(-30, 20)
        this.startX = x,
        this.startY = y
        this.x = this.startX,
        this.y = this.startY,
        this.speed = 5
        this.velX = Math.cos(this.startAngle * Math.PI / 180) * this.speed * choose([-1, 1])
        this.velY = Math.sin(this.startAngle * Math.PI / 180) * this.speed * choose([-1, 1]) 
        this.radius = radius,
        this.colour = "white"
    }

    draw(ctx){
        ctx.beginPath()
        ctx.fillStyle = this.colour
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

    reset(){
        this.startAngle = random(-30, 20)
        this.x = this.startX
        this.y = this.startY
        this.velX = Math.cos(this.startAngle * Math.PI / 180) * this.speed * choose([-1, 1])
        this.velY = Math.sin(this.startAngle * Math.PI / 180) * this.speed * choose([-1, 1])
    }

    update(ctx, p1, p2, canvas){
        this.draw(ctx)
        this.x += this.velX
        this.y += this.velY
        if(this.x - this.radius <= p1.x + p1.width && this.x + this.radius > p1.x && this.y - this.radius < p1.y + p1.height && this.y + this.radius > p1.y){
            this.velX *= -(Math.abs(this.y - p1.y + p1.height) / 1000 + 1)
        }
        if(this.x - this.radius < p2.x + p2.width && this.x + this.radius > p2.x && this.y - this.radius < p2.y + p2.height && this.y + this.radius > p2.y){
            this.velX *= -(Math.abs(this.y - p2.y + p2.height) / 1000 + 1)
        }
        if(this.y - this.radius < 0 || this.y + this.radius > 600){
            this.velY *= -1
        }
        if(this.x < 0){
            p2.score += 1
            this.reset()
        }
        if(this.x > canvas.width){
            p1.score += 1
            this.reset()
        }
    }
}