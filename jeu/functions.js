function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
let timer=100
let timerId
function determinewinner({player,enemy, timerId}){
    clearTimeout(timerId)

    if(player.health === enemy.health){
        document.querySelector("#annonce").innerHTML="TIE"
        timer=0
    }
    if(player.health > enemy.health ){
        document.querySelector("#annonce").innerHTML="ROUGE CONQUERIT LE COEUR DU PUBLIC"
        timer=0
    }
    if(enemy.health > player.health ){
        document.querySelector("#annonce").innerHTML="BLEU DOMINE"
        timer=0
    }
}

function decreasetimer(){

    if (timer>0){
        timerId= setTimeout(decreasetimer,1000)
        timer--
        document.querySelector("#timer").innerHTML= timer
    }
    if (timer===0){
        determinewinner({player, enemy, timerId})
    }

}