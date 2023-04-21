let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 600

let platform = new Platform(100, 550, 800, 50)
let p1 = new Player(150, 300, 60, 130, "red", -1)
let p2 = new Player(790, 300, 60, 130, "blue", 1)
let previous, current
previous = new Date()
function animate(){
    ctx.restore()
    ctx.save()
    current = new Date()
    dt = (current-previous)/1000
    previous = new Date()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    platform.draw(ctx)
    for(i = p1.bullets.length - 1; i >= 0; i--){
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(p1.bullets[i].x, p1.bullets[i].y, 3, 0, Math.PI * 2, false)
        ctx.fill()
        p1.bullets[i].x += p1.bullets[i].velX
        p1.bullets[i].y += p1.bullets[i].velY
        //If bullet goes off screen
        if(p1.bullets[i].x < 0 || p1.bullets[i].x > canvas.width || p1.bullets[i].y < 0 || p1.bullets[i].y > canvas.height){
            p1.bullets.splice(i, 1)
            continue
        }
        //If bullet hits the ground
        if(p1.bullets[i].x > platform.x && p1.bullets[i].x < platform.x + platform.width && p1.bullets[i].y > platform.y && p1.bullets[i].y < platform.y + platform.height){
            p1.bullets.splice(i, 1)
            continue
        }
        if(p1.bullets[i].x > p2.x && p1.bullets[i].x < p2.x + p2.width && p1.bullets[i].y > p2.y && p1.bullets[i].y < p2.y + p2.height){
            p2.hit(p1.bullets[i].velX, p1.bullets[i].velY, p1.bullets[i].speed)
            p1.bullets.splice(i, 1)
            continue
        }
    }
    for(i = p2.bullets.length - 1; i >= 0; i--){
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(p2.bullets[i].x, p2.bullets[i].y, 3, 0, Math.PI * 2, false)
        ctx.fill()
        p2.bullets[i].x += p2.bullets[i].velX
        p2.bullets[i].y += p2.bullets[i].velY
        //If bullet goes off screen
        if(p2.bullets[i].x < 0 || p2.bullets[i].x > canvas.width || p2.bullets[i].y < 0 || p2.bullets[i].y > canvas.height){
            p2.bullets.splice(i, 1)
            continue
        }
        //If bullet hits the ground
        if(p2.bullets[i].x > platform.x && p2.bullets[i].x < platform.x + platform.width && p2.bullets[i].y > platform.y && p2.bullets[i].y < platform.y + platform.height){
            p2.bullets.splice(i, 1)
            continue
        }
        if(p2.bullets[i].x > p1.x && p2.bullets[i].x < p1.x + p1.width && p2.bullets[i].y > p1.y && p2.bullets[i].y < p1.y + p1.height){
            p1.hit(p2.bullets[i].velX, p2.bullets[i].velY, p2.bullets[i].speed)
            p2.bullets.splice(i, 1)
            continue
        }
    }
    p1.update(ctx, dt, platform)
    p2.update(ctx, dt, platform)
    requestAnimationFrame(animate)
}
animate()

addEventListener("keydown", (e) => {
    // Player 1
    if(p1.fallingBack == 0){
        if(e.key.toLowerCase() == "a"){
            p1.move(-1)
        }
        if(e.key.toLowerCase() == "d"){
            p1.move(1)
        }
    }
    if(e.key.toLowerCase() == "f"){
        p1.aiming = true
    }
    // Player 2
    if(p2.fallingBack == 0){
        if(e.key == "ArrowLeft"){
            p2.move(-1)
        }
        if(e.key == "ArrowRight"){
            p2.move(1)
        }
    }
    if(e.key == " "){
        p2.aiming = true
    }
})

addEventListener("keyup", (e) => {
    if(e.key.toLowerCase() == "a" || e.key.toLowerCase() == "d"){
        p1.move(0)
    }
    if(e.key.toLowerCase() == "f"){
        p1.aiming = false
        p1.fire(p1.aimAngle)
        p1.aimAngle = 0
    }

    if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
        p2.move(0)
    }
    if(e.key == " "){
        p2.aiming = false
        p2.fire(p2.aimAngle)
        p2.aimAngle = 0
    }
})
