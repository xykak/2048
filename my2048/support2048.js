function getPosTop(i) {
    return 20 + 120 * i
}

function getPosLeft(j) {
    return 20 + 120 * j
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#eee4da";
            break;
        case 64:
            return "#ede0c8";
            break;
        case 128:
            return "#f2b179";
            break;
        case 256:
            return "#f59563";
            break;
        case 512:
            return "#eee4da";
            break;
        case 1024:
            return "#ede0c8";
            break;
        case 2048:
            return "#f2b179";
            break;
    }
    return 'black'

}

function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65'
    }
    return 'white'
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false
            }
        }
    }
    return true
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false
        }

    }
    return true
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false
        }
    }
    return true
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
                return true
            }
        }
    }
    return false
}


function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] == 0 || board[i][j] == board[i][j - 1]) {
                return true
            }
        }
    }
    return false
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                return true
            }
        }
    }
    return false
}

function canMoveDown(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j]==0 || board[i][j] == board[i - 1][j]) {
                return true
            }
        }
    }
    return false
}

function nomove(){
    if (canMoveUp(board)||canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)) {
        return false
    }
    return true
}
