var bgalpha = 1;
var cameraLocked = false;
var particleManager = new ParticleHandler();

var launchEditor = 0;

var tileset = new image('Assets/ground_tiles.png');

world = createWorld(map,'Assets/ground_tiles.png');
console.log(world)
var player = new Player();

var interactableList = [
    //{x:400,y:50,w:50,h:50,type:"text",text:"ooga booga bitch a rooney"},
    //{x:200,y:300,w:50,h:50,type:"item",item:new Item("oh yeah baby","found this shit on the floor, still not sure why you picked it up","tf you gonna do with it? eat it?")}
];


var alphaWall = false;
var drawAlphaWallTest = 1;

function drawAlphaWall(index,xy,x,a){
    if(Math.floor(xy[1]/world.tileSize)*world.columns+Math.floor(xy[0]/world.tileSize)==index){
        tileset.drawImg(xy[0],xy[1],world.tileSize,world.tileSize,a,world.tiles[x])
        drawAlphaWallTest = 0;
    }

}


function draw(){
    drawRect(0+Camera.x,0+Camera.y,w/Camera.scale,h/Camera.scale,"#4057a7",true,"#4057a7",bgalpha);

    for(var i of world.map){
        if(i[1] == 'obstacles'){
            particleManager.draw();
        }
        if(i[1] == 'objects'){
            player.draw();
        }else{
            var xy = [0,0];
            for(var x of i[0]){
                if(x!=0 && AABBCollision(xy[0],xy[1],w,h,player.x-w/2-16,player.y-h/2-16,w+64,h+64)){
                    drawAlphaWallTest = 1;
                    if(alphaWall && i[1] == 'wallTops'){
                        var temp = alphaWall;
                        drawAlphaWall(alphaWall,xy,x,0.2);
                        drawAlphaWall(alphaWall-1,xy,x,0.4);
                        drawAlphaWall(alphaWall-2,xy,x,0.7);
                        drawAlphaWall(alphaWall+1,xy,x,0.4);
                        drawAlphaWall(alphaWall+2,xy,x,0.7);
                        for(var z = 0; z <= 1; z++){
                            alphaWall+= -100 + 300*z
                            drawAlphaWall(alphaWall,xy,x,0.2);
                            drawAlphaWall(alphaWall-1,xy,x,0.4);
                            drawAlphaWall(alphaWall+1,xy,x,0.4);
                        }
                        alphaWall = temp;

                    }
                    if(drawAlphaWallTest){
                        tileset.drawImg(xy[0],xy[1],world.tileSize,world.tileSize,1,world.tiles[x])
                    }
                }
                xy[0]+=world.tileSize;
                if(xy[0] >= world.tileSize * world.columns){
                    xy[0] = 0;
                    xy[1] += world.tileSize;
                }
            }
        }
    }
    drawRect(0,0,100+Camera.x,100+Camera.y,'white',1,'white',1)
    showText("alphaWall: "+alphaWall, Camera.x+2,Camera.y+10,10)
    showText("Camera.x: "+Camera.x, Camera.x+2,Camera.y+20,10)
    showText("Camera.y: "+Camera.y, Camera.x+2,Camera.y+30,10)
    showText("collidedTileType: "+player.collidedTile, Camera.x+2,Camera.y+40,10)
    showText("collidedTileIndex: "+player.collidedTileIndex, Camera.x+2,Camera.y+50,10)
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
    if(!launchEditor){
        updateCamera();
        update();
        draw();
    }else{
        editor();
    }

}

setInterval(main,1000/60);