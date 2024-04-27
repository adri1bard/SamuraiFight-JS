const canvas = document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width= 1024
canvas.height = 576
const gravity=0.2

c.fillRect(0,0, canvas.width, canvas.height)






const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position:{
        x:600,
        y:128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesmax: 6
})

const player=new Fighter({
    position:{
    x: 600,
    y: 0
    },
    velocity: {
        x:0,
        y:0,
    },
    offset:{
        x: -100,
        y:198
    },
    sprites:{
        idle:{
            imageSrc:"./img/kenji/idle.png",
            framesmax:4,
        },
        run:{
            imageSrc:"./img/kenji/run.png",
            framesmax:8
        },
        jump:{
            imageSrc:"./img/kenji/jump.png",
            framesmax:2

        },
        fall:{
            imageSrc:"./img/kenji/fall.png",
            framesmax:2
        },
        attack:{
            imageSrc:"./img/kenji/attack1.png",
            framesmax:4
        },
    },
    color:"blue",
    imageSrc:"./img/kenji/idle.png",
    scale: 2,
    framesmax: 4
})

const enemy=new Fighter({
    position:{
        x: 100,
        y: 0
    },
    velocity: {
        x:0,
        y:0,
    },
    offset:{
        x:0 ,
        y:190
    },
    sprites:{
        idle:{
            imageSrc:"./img/samuraiMack/idle.png",
            framesmax:8,
        },
        run:{
            imageSrc:"./img/samuraiMack/run.png",
            framesmax:8
        },
        jump:{
            imageSrc:"./img/samuraiMack/jump.png",
            framesmax:2

        },
        fall:{
            imageSrc:"./img/samuraiMack/fall.png",
            framesmax:2
        },
        attack:{
            imageSrc:"./img/samuraiMack/attack1.png",
            framesmax:6
        },
    },
    imageSrc:"./img/samuraiMack/idle.png",
    scale: 2,
    framesmax: 8

})

console.log(player)
const keys={
    q:{
        pressed: false
    },
    d:{
        pressed: false
    },
    z:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    }
}


decreasetimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle="black"
    c.fillRect(0,0,canvas.width, canvas.height)
    //c.clearRect(0,0,canvas.width, canvas.height
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x=0
    enemy.velocity.x=0
    if (keys.ArrowLeft.pressed&& enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x=-3
        enemy.switchsprite("run")
    }else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x= 3
        enemy.switchsprite("run")
    }else{
        enemy.switchsprite("idle")
    }
    if (enemy.velocity.y<0){
        enemy.switchsprite("jump")
    }else if(enemy.velocity.y>0){
        enemy.switchsprite("fall")
    }

    if (player.velocity.y<0){
        player.switchsprite("jump")
    }else if(player.velocity.y>0){
        player.switchsprite("fall")
    }






    if (keys.q.pressed&& player.lastkey==='q'){
        player.velocity.x=-3
        player.switchsprite("run")
    }else if(keys.d.pressed && player.lastkey==='d'){
        player.velocity.x= 3
        player.switchsprite("run")
    }else{
        player.switchsprite("idle")
    }

    if (player.velocity.y<0){
        player.switchsprite("jump")
    }else if(player.velocity.y>0){
        player.switchsprite("fall")
    }



    if(player.isattacking){
        player.switchsprite("attack1")
    }
    if(enemy.isattacking){
        enemy.switchsprite("attack1")
    }


    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isattacking){
        enemy.health-=20
        document.querySelector('#enemyhealth').style.width= enemy.health +'%'
        player.isattacking=false
    }

    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isattacking){
        player.health-=20
        document.querySelector('#playerhealth').style.width= player.health +'%'
        enemy.isattacking=false
    }
    if( enemy.health<=0 || player.health <= 0){
        determinewinner({player,enemy, timerId})
    }
}

animate()

window.addEventListener('keydown',(event)=>
{
    switch(event.key){
        case'f':
            player.attack()
            break
        case'm':
            enemy.attack()
            break
        case 'd':
            keys.d.pressed=true
            player.lastkey='d'
            break


        case 'q':
            keys.q.pressed=true
            player.lastkey='q'
            break

        case 'z':
            player.velocity.y=-5
            break



        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastkey='ArrowRight'

            break


        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastkey='ArrowLeft'
            break

        case 'ArrowUp':
            enemy.velocity.y=-5
            break

    }
    console.log(event)
})



window.addEventListener('keyup',(event)=>
{
    switch(event.key){
        case 'd':
            keys.d.pressed=false
            break

        case 'q':
            keys.q.pressed=false
            break
        case 'z':
            keys.z.pressed =false
            break

        //enemy


        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break

    }
    console.log(event)
})
