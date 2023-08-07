const statusIndicator = document.querySelector('#statusIndicator')
const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 300
canvas.height = 300

let board = []
let turn = 'x'
let state = null
let winner = null

function reset(){
    board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ]
    state = null
    winner = null
}

function checkBoard(board, prevTurn){
    let fullRow = false // If there is 3 in a row then this will be set to true

    // Check Rows & Cols
    for(let index = 0; index < board.length; index++){
        if(board[index][0] == prevTurn && board[index][1] == prevTurn && board[index][2] == prevTurn || board[0][index] == prevTurn && board[1][index] == prevTurn && board[2][index] == prevTurn){
            fullRow = true
        }
    }
    // Check Diags
    if(board[0][0] == prevTurn && board[1][1] == prevTurn && board[2][2] == prevTurn || board[0][2] == prevTurn && board[1][1] == prevTurn && board[2][0] == prevTurn){
        fullRow = true
    }

    if(fullRow){
        // Someone won
        return prevTurn
    }else{
        let notFull = false
        for(row = 0; row < board.length; row++){
            for(col = 0; col < board[row].length; col++){
                if(board[row][col] == '-'){
                    notFull = true
                }
            }
        }
        if(notFull){
            // Game is not yet over
            return null
        }else{
            // Game is drawn
            return '-'
        }
    }
}
function drawLine(startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawBoard(board){
    //Draw Grid Lines
    drawLine(canvas.width / 3, 0, canvas.width / 3, canvas.height)
    drawLine(canvas.width / 3 * 2, 0, canvas.width / 3 * 2, canvas.height)
    drawLine(0, canvas.height / 3, canvas.width, canvas.height / 3)
    drawLine(0, canvas.height / 3 * 2, canvas.width, canvas.height / 3 * 2)
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            if(board[row][col] != '-'){
                ctx.font = canvas.width / 3 + 'px Arial'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(board[row][col], col * 100 + 50, row * 100 + 50)
            }
        }
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(winner != null){
        state = 'gameOver'
    }
    if(state != 'gameOver'){
        statusIndicator.innerHTML = '<b>' + turn.toUpperCase() + ' Turn</b>'
    }else{
        if(winner != '-'){
            statusIndicator.innerHTML = '<b>' + winner.toUpperCase() + ' Wins!</b>'
        }else{
            statusIndicator.innerHTML = '<b>Draw!</b>'
        }
    }
    drawBoard(board)
    requestAnimationFrame(update)
}

addEventListener('click', (e) => {
    if(state != 'gameOver'){
        let bound = canvas.getBoundingClientRect();

        let mouseX = e.clientX - bound.left - canvas.clientLeft;
        let mouseY = e.clientY - bound.top - canvas.clientTop;
        
        if(mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height){
            let row = Math.floor(mouseY / 100)
            let col = Math.floor(mouseX / 100)
            if(board[row][col] == '-'){
                board[row][col] = turn
                winner = checkBoard(board, turn)
                if(turn == 'o'){
                    turn = 'x'
                }else if(turn == 'x'){
                    turn = 'o'
                }
            }
        }
    }
})
reset()
update()