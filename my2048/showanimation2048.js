function showNumberWithAnimation(x,y,number){
    var numberCell = $(`#number-cell-${x}-${y}`)
    numberCell.css({
        'background-color': getNumberBackgroundColor(number),
        'color': getNumberColor(number),
    })
    numberCell.text(number)
    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(x),
        left: getPosLeft(y)
    },50)
}

function showMoveAnimation(i, j, y, x){
    // console.log(i,j,i,k);
    var numberCell = $(`#number-cell-${i}-${j}`)
    numberCell.animate({
        top: getPosTop(y),
        left: getPosLeft(x),
    }, 200)
}

function updateScore(score) {
    $('#score').text(score)
}
