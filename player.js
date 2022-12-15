import {Sitting, Running,Jumping,Falling,Rolling,} from './playerStates.js';

export class player{
    constructor(game){
        this.game=game;
        this.width= 100;
        this.height=91.3;
        this.x=0;
        this.y= this.game.height-this.height-this.game.groundMargin;
        this.vy= 0;
        this.weight =1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed =0;
        this.maxspeed= 10;
        this.maxframe= 5;
        this.fps= 22;
        this.frameInterval= 1000/this.fps;
        this.frameTimer=0;
        this.states = [new Sitting(this.game), new Running(this.game),new Jumping(this.game),new Falling(this.game),
        new Rolling(this.game)];
       
       



    }
    update(input,deltaTime){
        this.checkcollision();
        this.currentState.handleInput(input);
        this.x += this.speed;
    if(input.includes('ArrowRight')) this.speed = this.maxspeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxspeed;
    else this.speed=0;
    if(this.x<0) this.x =0;
    if(this.x> this.game.width-this.width) this.x =this.game.width-this.width;

    
    //if(input.includes('ArrowUp') && this.onGround()) this.vy -=20;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy =0;
if(this.frameTimer>this.frameInterval){
    this.frameTimer =0;
    if(this.frameX< this.maxFrame) this.frameX++;
    else this.frameX=0;


} 
else{
    this.frameTimer += deltaTime;
}
//else this.frameX =0;


    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }
    onGround(){
        return this.y>= this.game.height-this.height-this.game.groundMargin;
    }
    setState(state,speed)
    {
this.currentState = this.states[state];
this.game.speed= this.game.maxspeed*speed;
this.currentState.enter();
    }
    checkcollision(){
        this.game.enemies.forEach(enemy=>{
            if(enemy.x<this.x+this.width &&
                enemy.x +enemy.width>this.x &&
                enemy.y<this.y+this.height &&
                enemy.y+enemy.height>this.y
                ){
              enemy.markedForDeletion=true;
              this.game.score++;
            }
            else{

            }
        })
    }
}