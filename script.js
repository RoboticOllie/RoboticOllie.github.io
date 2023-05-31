const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 900
canvas.height = 600

let p1 = new Paddle(50, 250, 20, 100)
let p2 = new Paddle(830, 250, 20, 100)
let ball = new Ball(canvas.width / 2, canvas.height / 2, 7)

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(2, 0, 53)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = "bold 40px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(p1.score, canvas.width / 4, 70)
    ctx.fillText(p2.score, canvas.width / 2 + canvas.width / 4, 70)


    for(let i = 15; i < canvas.height; i += 60){
        console.log('HI')
        ctx.fillStyle = "white"
        ctx.fillRect(canvas.width / 2 - 5, i, 10, 30)
    }

    p1.update(ctx)
    p2.update(ctx)
    ball.update(ctx, p1, p2, canvas)

    requestAnimationFrame(animate)
}

addEventListener('keydown', (e) => {
    if(e.key == "w" && !p1.dirs.includes(-1)){
        p1.dirs.push(-1)
    }
    if(e.key == "s" && !p1.dirs.includes(1)){
        p1.dirs.push(1)
    }
    if(e.key == "ArrowUp" && !p2.dirs.includes(-1)){
        p2.dirs.push(-1)
    }
    if(e.key == "ArrowDown" && !p2.dirs.includes(1)){
        p2.dirs.push(1)
    }
})


addEventListener('keyup', (e) => {
    let index
    if(e.key == "w"){
        index = p1.dirs.indexOf(-1)
        console.log(index)
        p1.dirs.splice(index, 1)
    }
    if(e.key == "s"){
        index = p1.dirs.indexOf(1)
        p1.dirs.splice(index, 1)
    }
    if(e.key == "ArrowUp"){
        index = p2.dirs.indexOf(-1)
        p2.dirs.splice(index, 1)
    }
    if(e.key == "ArrowDown"){
        index = p2.dirs.indexOf(1)
        p2.dirs.splice(index, 1)
    }
})

animate()