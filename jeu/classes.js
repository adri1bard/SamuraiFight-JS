



class Sprite{
    constructor({position, imageSrc, scale =1,framesmax=1}){
        this.position=position

        this.height= 150
        this.width=50
        this.image= new Image()
        this.image.src = imageSrc
        this.scale= scale
        this.framesmax= framesmax
        this.framecurent =0
        this.frameselapsed =0
        this.frameshold = 5

    }
    draw(){

        c.drawImage(this.image,  this.framecurent * this.image.width/this.framesmax ,0,this.image.width/this.framesmax,this.image.height,

            this.position.x, this.position.y, (this.image.width/this.framesmax) * this.scale, this.image.height * this.scale)



    }
    animateframes(){
        this.frameselapsed++
        if(this.frameselapsed% this.frameshold=== 0){
            if(this.framecurent< this.framesmax - 1) {
                this.framecurent++
            }else{
                this.framecurent=0
            }
        }
    }
    update(){
        this.animateframes()
        this.draw()


    }


}


class Fighter extends Sprite{
    constructor({position, velocity, color="red", offset={x:0,y:0}, imageSrc, scale =1,framesmax=1, sprites}){
        super({position, imageSrc, scale, framesmax, offset})

        this.velocity= velocity
        this.height= 150
        this.width=50
        this.health=100
        this.lastkey;
        this.isattacking=false
        this.color=color
        this.framecurent =0
        this.frameselapsed =0
        this.frameshold = 5
        this.offset= offset
        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src= sprites[sprite].imageSrc
        }
        this.attackBox={
            position: {
                x: this.position.x,
                y: this.position.y,
            } ,
            offset,
            height: 50,
            width:150
        }
    }


    update(){
        this.animateframes()
        this.draw()
        this.attackBox.position.x=this.position.x + this.attackBox.offset.x
        this.attackBox.position.y=this.position.y
        this.position.x+=this.velocity.x
        this.position.y+= this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height- this.offset.y ){
            this.velocity.y=0
            this.position.y= 236
        }else{
            this.velocity.y += gravity
            console.log(this.position.y)
        }


    }
    attack(){
        this.isattacking=true
        this.switchsprite("attack")
        setTimeout(()=>{
            this.isattacking=false
        },100  )
    }
    switchsprite(sprite){
        if (this.image=== this.sprites.attack.image && this.framecurent < this.sprites.attack.framesmax -1){ return}
        switch (sprite){

            case "idle":

                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesmax=this.sprites.idle.framesmax


                }
                break

            case "run":
                if(this.image !== this.sprites.run.image) {
                    this.image= this.sprites.run.image
                    this.framesmax=this.sprites.run.framesmax

                }
                break
            case "jump":
                if(this.image !== this.sprites.jump.image) {

                    this.image = this.sprites.jump.image
                    this.framesmax = this.sprites.jump.framesmax
                    this.framecurent=0
                }
                break

            case "fall":
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesmax = this.sprites.fall.framesmax

                }
                break
            case "attack":
                if(this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.framesmax = this.sprites.attack.framesmax

                }
                    break


        }
    }

}
