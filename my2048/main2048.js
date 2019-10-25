var board = new Array();
var score = 0;

$(document).ready(function() {
    newgame();
})

function newgame() {
    //初始化棋盘
    init()
    //初始化数组
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView()
    //随机在两个格子生成数据
    generateOneNumber()
    generateOneNumber()
}

function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var gridCell = $(`#grid-cell-${i}-${j}`)
            gridCell.css({
                'top': getPosTop(i),
                'left': getPosLeft(j),
            })
        }
    }
}

function updateBoardView() {
    $('.number-cell').remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var t = `<div class='number-cell' id='number-cell-${i}-${j}'></div>`
            $('#grid-container').append(t)
            var theNumberCell = $(`#number-cell-${i}-${j}`)
            if (board[i][j] == 0) {
                theNumberCell.css({
                    width: '0',
                    height: '0',
                    top: getPosTop(i),
                    left: getPosLeft(j)
                })
            } else {
                theNumberCell.css({
                    'width': '100px',
                    'height': '100px',
                    'top': getPosTop(i),
                    'left': getPosLeft(j),
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j]),
                });
                //格子赋值
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {

    if (nospace(board)) {
        return false
    }
    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        if (board[randomX][randomY] == 0) {
            break;
        }
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));
    }
    //在随机位置生成一个数
    board[randomX][randomY] = 2;

    //在随机位置显示动画
    showNumberWithAnimation(randomX, randomY, board[randomX][randomY])

    return true
}

//键盘事件
$(document).keydown(function() {
    switch (event.code) {
        case 'ArrowLeft':
            if (moveLeft()) {
                generateOneNumber()
                isgameover()
            }
            break;
        case 'ArrowUp':
            if(moveUp()){
                generateOneNumber()
                isgameover()
            }
            break;
        case 'ArrowRight':
            if (moveRight()) {
                generateOneNumber()
                isgameover()
            }
            break;
        case 'ArrowDown':
            if (moveDown()) {
                generateOneNumber()
                isgameover()
            }
            break;
        default:
            break;
    }

})

function isgameover() {
    if(nospace(board) && nomove(board)){
        gameover()
    }
}

function gameover(){
    alert('gameover!')
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                    } else if (board[i][j] == board[i][k] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k)
                        //add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score += board[i][k]
                        updateScore(score)
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200)
    return true
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score += board[i][k]
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200)
    return true
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j]!=0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j]==0 && noBlockVertical(j,k,i,board)) {
                        showMoveAnimation(i,j,k)
                        board[k][j] = board[i][j]
                        board[i][j] = 0

                    } else if (board[k][j]==board[i][j] && noBlockVertical(j,k,i,board)) {
                        showMoveAnimation(i,j,k)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score += board[k][j]
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200)
    return true
}

function moveDown(){
    if (!canMoveDown(board)) {
        return false
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j]!=0) {
                for (var k = 3; k > i ; k--) {
                    if (board[k][j]==0 && noBlockVertical(j,i,k,board)) {
                        showMoveAnimation(i,j,k,j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                    } else if (board[k][j]==board[i][j] && noBlockVertical(j,i,k,board)) {
                        showMoveAnimation(i,j,k,j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score += board[k][j]
                        updateScore(score)
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200)
    return true
}
