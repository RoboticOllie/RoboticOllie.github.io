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
    p1.update(ctx, dt, platform, p2)
    p2.update(ctx, dt, platform, p1)
    // if the players collide, make them both be hit back by calling hit(), and then make it so they can go on top of each other later
    if(p1.x + p1.width > p2.x && p1.x < p2.x + p2.width && p1.y + p1.height > p2.y && p1.y < p2.y + p2.height){
        p1.hit(-p1.velX, 0, 100)
        p2.hit(-p2.velX, 0, 100)
    }
    if(p1.y > platform.y + platform.height){
        p2.score += 1
        reset()
    }
    if(p2.y > platform.y + platform.height){
        p1.score += 1
        reset()
    }

    p1HealthBar = document.getElementById('p1Health')
    p2HealthBar = document.getElementById('p2Health')
    p1ScoreCounter = document.getElementById('p1Score')
    p2ScoreCounter = document.getElementById('p2Score')
    p1HealthBar.style.width = p1.maxHealth / 100 * p1.health + '%'
    p2HealthBar.style.width = p2.maxHealth / 100 * p2.health + '%'
    p1ScoreCounter.innerHTML = p1.score
    p2ScoreCounter.innerHTML = p2.score
    if(p1.health <= 0){
        p2.score += 1
        reset()
    }
    if(p2.health <= 0){
        p1.score += 1
        reset()
    }
    requestAnimationFrame(animate)
}
animate()

addEventListener("keydown", (e) => {
    // Player 1
    if(p1.fallingBack == false){
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
    if(p2.fallingBack == false){
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
    if(e.key.toLowerCase() == "w" && p1.fallingBack == false){
        p1.jump(platform, p2)
    }
    if(e.key.toLowerCase() == "f"){
        p1.aiming = false
        p1.fire(p1.aimAngle)
        p1.aimAngle = 0
    }

    if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
        p2.move(0)
    }
    if(e.key == "ArrowUp" && p2.fallingBack == false){
        p2.jump(platform, p1)
    }
    if(e.key == " "){
        p2.aiming = false
        p2.fire(p2.aimAngle)
        p2.aimAngle = 0
    }
})

function reset(){
    p1.reset()
    p2.reset()
}
