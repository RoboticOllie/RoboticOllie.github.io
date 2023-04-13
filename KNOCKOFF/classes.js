class Platform{
    constructor(x, y, width, height){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
    }

    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Player{
    constructor(startX, startY, width, height, colour){
        this.x = startX,
        this.y = startY,
        this.width = width,
        this.height = height,
        this.colour = colour,
        this.velY = 0
        this.velX = 0
    }

    draw(ctx){
        ctx.fillStyle = this.colour
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    move(dir){
        this.velX = dir
    }

    update(dt, platform){
        this.x += this.velX
        if(this.y + this.height >= platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width){
            this.velY = 0
            this.y = platform.y + 5 - this.height
        }else{
            this.y += this.velY
            this.velY += 9.81*dt
        }
    }
}
