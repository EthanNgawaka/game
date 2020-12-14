class DialogueBoxHandler{
    constructor(){
        this.queue = [];
        this.displaytext = "";
        this.timer = 10;
        this.place = 0;
        this.currenttext = "";
        this.doonce = false;
        this.keydown = false;
    }
    queueNewText(text){
        this.queue.push(text);
    }
    draw(){
        c.save()
        if(this.queue.length > 0 && this.doonce){
            //draw rect

            drawRect(Camera.x+92,Camera.y+375,600,200,"black",1,"black",0.9);
            drawRect(Camera.x+92,Camera.y+375,600,200,"white",0,0,1);
            //wrapText(c,this.displaytext,Camera.x+100,Camera.y+400,600,25,"red");
            wrapText(c,this.displaytext,Camera.x+100,Camera.y+400,600,25,"white");
            

        }
        c.restore();
    }
    update(){
        
        if(!this.doonce && this.queue.length > 0){
            this.doonce = true;
            this.timer = 3;
            this.displaytext = "";
            this.currenttext = this.queue[0];
            this.place = 0;
            if(checkKey("KeyZ")){
                this.keydown = true;
            }else{
                this.keydown = false;
            }
        }

        if(this.displaytext.length >= this.currenttext.length){
            if(checkKey("KeyZ") && !this.keydown && this.doonce){
                this.doonce = false;
                player.keydown = true;
                this.queue = arrayRemove(this.queue,this.currenttext);
                this.displaytext = "";

            }
        }else{
            if(this.timer <= 0){
                this.timer = 3;
                this.displaytext += this.currenttext[this.place];
                this.place++;
            }else{this.timer--;}
            if(checkKey("KeyZ")&&!this.keydown){
                this.displaytext = this.currenttext;
            }
        }
        if(checkKey("KeyZ")){
            this.keydown = true;
        }else{
            this.keydown = false;
        }
    }

}
var dialogueBoxHandler = new DialogueBoxHandler();
