let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 600

let platform = new Platform(100, 550, 800, 50)
let p1 = new Player(150, 300, 60, 130, "red")
let p2 = new Player(790, 300, 60, 130, "blue")
let previous, current
previous = new Date()
function animate(){
    current = new Date()
    dt = (current-previous)/1000
    previous = new Date()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    platform.draw(ctx)
    p1.draw(ctx)
    p1.update(dt, platform)
    p2.draw(ctx)
    p2.update(dt, platform)
    requestAnimationFrame(animate)
}
animate()

addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "a"){
        p1.move(-1)
    }
    if(e.key.toLowerCase() == "d"){
        p1.move(1)
    }
    if(e.key == "ArrowLeft"){
        p2.move(-1)
    }
    if(e.key == "ArrowRight"){
        p2.move(1)
    }
})

addEventListener("keyup", (e) => {
    if(e.key.toLowerCase() == "a" || e.key.toLowerCase() == "d"){
        p1.move(0)
    }
    if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
        p2.move(0)
    }
})
