class Platform{
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Player{
    constructor(startX, startY, width, height, colour, rotateDir){
        this.startX = startX
        this.startY = startY
        this.x = this.startX
        this.y = this.startY
        this.width = width
        this.height = height
        this.colour = colour
        this.velY = 0
        this.velX = 0
        this.aiming = false
        this.aimAngle = 0
        this.rotateDir = rotateDir
        this.gunX
        this.gunY
        this.gunWidth = this.width/2
        this.gunLength = this.height/1.6
        this.bullets = []
        this.fallingBack = false
        this.maxHealth = 100
        this.health = this.maxHealth
        this.score = 0
    }

    reset(){
        this.x = this.startX
        this.y = this.startY
        this.velY = 0
        this.velX = 0
        this.aiming = false
        this.aimAngle = 0
        this.bullets = []
        this.fallingBack = false
        this.health = this.maxHealth
    }

    draw(ctx){
        //Body
        ctx.fillStyle = this.colour
        ctx.fillRect(this.x, this.y, this.width, this.height)

        //Gun
        this.gunX = this.x + this.width/2
        this.gunY = this.y + this.height/3
        ctx.fillStyle = 'grey'
        ctx.translate(this.gunX,this.gunY)
        ctx.rotate(this.aimAngle * (Math.PI / 180))
        ctx.translate(-this.gunX, -this.gunY)
        ctx.fillRect(this.gunX - this.gunWidth/2, this.gunY, this.gunWidth, this.gunLength)
        ctx.setTransform(1, 0, 0, 1, 0, 0, 0)
    }

    move(dir){
        this.velX = dir * 0.7
    }

    jump(platform, enemy){
        if(this.y + this.height > platform.y || (this.y + this.height >= enemy.y && this.y < enemy.y + enemy.height && this.x + this.width > enemy.x && this.x < enemy.x + enemy.width)){
            this.velY = -7
        }
    }

    fire(angle){
        let bulletSpeed = 10
        this.bullets.push({
            x: this.gunX,
            y: this.gunY,
            speed: bulletSpeed,
            velX: Math.cos((this.aimAngle + 90) * (Math.PI / 180)) * bulletSpeed,
            velY: Math.sin((this.aimAngle + 90) * (Math.PI / 180)) * bulletSpeed
        })
    }

    hit(bulletVelX, bulletVelY, bulletSpeed){
        this.velX += bulletVelX * bulletSpeed / 10
        this.velY += bulletVelY * bulletSpeed / 10
        this.fallingBack = true
        this.health -= Math.round(Math.abs(bulletVelX) / 2)
    }


    update(ctx, dt, platform, enemy){
        let alreadyColliding = false
        this.draw(ctx)
        this.x += this.velX * dt * 60
        if(this.y + this.height > enemy.y && this.y < enemy.y + enemy.height && this.x + this.width > enemy.x && this.x < enemy.x + enemy.width){
            alreadyColliding = true
        }
        if(this.fallingBack == true){
            if(this.velX > 0){
                this.velX -= dt * 60

                if(this.velX <= 0){
                    this.velX = 0
                    this.fallingBack = false
                }
            }
            
            if(this.velX <= 0){
                this.velX += dt * 60

                if(this.velX > 0){
                    this.velX = 0
                    this.fallingBack = false
                }
            }
        }
        if(this.aiming == true){
            this.aimAngle += this.rotateDir * 2.5
        }
        if(this.y + this.height >= platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width && this.y + this.height <= platform.y + platform.height && this.velY > 0){
            this.velY = 0
            this.y = platform.y + 5 - this.height
        }else{
            this.y += this.velY
            this.velY += 9.81*dt
        }
        if(this.y + this.height >= enemy.y && this.y < enemy.y + enemy.height && this.x + this.width > enemy.x && this.x < enemy.x + enemy.width && !alreadyColliding){
            this.y = enemy.y - this.height
            this.velY = 0
        }
    }
}