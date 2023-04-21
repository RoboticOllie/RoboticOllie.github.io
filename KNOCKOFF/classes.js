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
        this.x = startX
        this.y = startY
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
        this.fallingBack = 0
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
        this.velX = dir
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
        console.log(this.bullets)
    }

    hit(bulletVelX, bulletVelY, bulletSpeed){
        this.velX += bulletVelX * bulletSpeed / 10
        this.velY += bulletVelY * bulletSpeed / 10
        this.fallingBack = 10
    }


    update(ctx, dt, platform){
        this.draw(ctx)
        this.x += this.velX
        if(this.fallingBack > 0){
            this.fallingBack -= 1
            this.velX = this.velX/10*this.fallingBack
            if(this.fallingBack == 0){
                this.velX = 0
            }
        }
        if(this.aiming == true){
            this.aimAngle += this.rotateDir * 2.5
        }
        if(this.y + this.height >= platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width && this.y + this.height <= platform.y + platform.height){
            this.velY = 0
            this.y = platform.y + 5 - this.height
        }else{
            this.y += this.velY
            this.velY += 9.81*dt
        }
    }
}
