//test push?
var bgalpha = 1;
var cameraLocked = false;
var particleManager = new ParticleHandler();

var player = new Player();
var dialogueBoxHandler = new DialogueBoxHandler();

var interactableList = [
    //{x:400,y:50,w:50,h:50,type:"text",text:"ooga booga bitch a rooney"},
    //{x:200,y:300,w:50,h:50,type:"item",item:new Item("oh yeah baby","found this shit on the floor, still not sure why you picked it up","tf you gonna do with it? eat it?")}
];



function draw(){
    drawRect(0+Camera.x,0+Camera.y,w/Camera.scale,h/Camera.scale,"#4057a7",true,"#4057a7",bgalpha);

    for(var x=0;x<world.map.length;x++){
        if(world.map[x] != 0){
            if(world.map[x] == 1 || world.map[x] == 2 || world.map[x] == 3 || world.map[x] == 4 || world.map[x] == 5){
                drawRect((x-(world.columns*Math.floor(x/world.columns)))*world.tileSize,Math.floor(x/world.columns)*world.tileSize,world.tileSize,world.tileSize,"white",1,"white",1)
            }else{
                drawRect((x-(world.columns*Math.floor(x/world.columns)))*world.tileSize,Math.floor(x/world.columns)*world.tileSize,world.tileSize,world.tileSize,"red",1,"red",1)
            }
        }
    }

    particleManager.draw();
    player.draw();
    dialogueBoxHandler.draw();
    
}

function update(){
    particleManager.update();
    player.update();
    dialogueBoxHandler.update();
}

function updateCamera(){
    /*
    if(!cameraLocked){
        Camera.target.x = (player.x - Camera.x) * Camera.scale + player.w/2 * Camera.scale;
        Camera.target.y = (player.y - Camera.y) * Camera.scale + player.h/2 * Camera.scale;
        Camera.x += (Camera.target.x - w/2)/15;
        Camera.y += (Camera.target.y - h*0.7)/15;
    }
    */
    Camera.x = player.x - w/2/Camera.scale + player.w/2;
    Camera.y = player.y - h/2/Camera.scale + player.h/2;
}

function main(){
    updateCamera();
    update();
    draw();


}

setInterval(main,1000/60);