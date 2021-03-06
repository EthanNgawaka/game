itemDict = {
    1000: function (){genericItem("1000")},
    1001: function (){genericItem('1001')},

}

/*
rows: map['height'],
    columns: map['width'],
    tileSize: 32,
    map: [
        map['layers'][0]['data'],
        map['layers'][1]['data'],
        map['layers'][2]['data'],
        map['layers'][3]['data'],
        map['layers'][4]['data'],
    ]
*/

function createWorld(mapData, tileImages){
    var tempImg = new Image();
    tempImg.src = 'Assets/ground_tiles.png';
    tempImg.onload = function(e){ // have to do it on image load otherwise cannot grab properties of image as it doesnt load in time
        var imgW = tempImg.width/32;
        for(var x = 0; x < imgW * tempImg.height/32; x++){
            tempContainer.tiles[x+1] = [(x - imgW * Math.floor(x/imgW))*tempContainer.tileSize,Math.floor(x/imgW)*tempContainer.tileSize,tempContainer.tileSize-1];
        }
    }
    var tempContainer = {
        columns: mapData['width'],
        rows: mapData['height'],
        tileSize: mapData['tileheight'],
        map: [],
        tiles: {},
    }
    for(var x of mapData['layers']){
        tempContainer.map.push([x['data'],x['name']]);
    }
    
    

    return tempContainer;
}
class Player{
    constructor(){
        this.x = 80;
        this.y = 80;
        this.xv = 0;
        this.yv = 0;
        this.oldx = 0;
        this.oldy = 0;
        this.w = 28;
        this.h = 16;
        this.speed = 1;
        this.collidedTile = 0;
        this.collidedTileIndex = 0;
        this.inv = [
            new Item("test1", "this is infact a test", "this is a generic item test"),
        ];
        this.invopen = false;
        this.invkey = false;
        this.selecteditem = 0;
        this.keydown = false;
        this.sprite = new spriteSheet("Assets/tobman.png",14,32,3,0,0,this.w,this.h);
        this.sprite.addState("left",1,1);
        this.sprite.addState("right",2,1);
        this.sprite.addState("up",3,1);
        this.sprite.addState("down",4,1);
        this.sprite.state = "left";
        this.draww = this.w;
        this.drawh = this.h;
        this.drawoffset = {x:0,y:0};
        this.stretch = 0;
        this.stretchtimer = 0;
        this.wstretch = 5;
        this.hstretch = -7;

        this.vKeyDown = false;
        this.walkingTimer = 0;
        this.noclip = false;

        this.center = [this.x+this.w/2,this.y+this.h/2]

        this.collisionTiles = {
            1:function(row,col){player.leftCollision(col)},
            2:function(row,col){player.rightCollision(col)},
            3:function(row,col){player.bottomCollision(row)},
            4:function(row,col){player.topCollision(row)},
            5:function(row,col,index){
                if(world.map[1][0][index+1]==0){
                    player.rightCollision(col);
                }
                if(world.map[1][0][index-1]==0){
                    player.leftCollision(col);
                }
                if(world.map[1][0][index+world.rows]==0){
                    player.bottomCollision(row);
                }
                if(world.map[1][0][index-world.rows]==0){
                    player.topCollision(row);
                }
            },
        }
    }
    leftCollision(col){
        if(this.x-this.oldx > 0){
            var left = col * world.tileSize;
            if(this.x+this.w > left && this.oldx+this.w <= left){
                this.x = this.oldx = left - this.w - 0.001;
                this.xv = 0;
            }
            return true;
        }
        return false;
    }
    rightCollision(col){
        if(this.x-this.oldx < 0){
            var right = (col+1) * world.tileSize;
            if(this.x < right && this.oldx >= right){
                this.x = this.oldx = right;
                this.xv = 0;
            }
            return true;
        }
        return false;
    }
    bottomCollision(row){
        if(this.y-this.oldy < 0){
            var bottom = (row+1) * world.tileSize;
            if(this.y < bottom && this.oldy >= bottom){
                this.y = this.oldy = bottom;
                this.yv = 0;
            }
            return true;
        }
        return false;
    }
    topCollision(row){
        if(this.y-this.oldy > 0){
            var top = row * world.tileSize;
            if(this.y+this.h > top && this.oldy+this.h <= top){
                this.y = this.oldy = top - this.h - 0.001;
                this.yv = 0;
            }
            return true;
        }
        return false;
    }
    collisions(){
        var rectTilePos = [
            [Math.floor(this.y/world.tileSize),Math.floor(this.x/world.tileSize)],//top left
            [Math.floor(this.y/world.tileSize),Math.floor((this.x+this.w)/world.tileSize)],//top right
            [Math.floor((this.y+this.h)/world.tileSize),Math.floor(this.x/world.tileSize)],//bottom left
            [Math.floor((this.y+this.h)/world.tileSize),Math.floor((this.x+this.w)/world.tileSize)],//bottom right
        ]
        var wallCheckTiles = [
            [Math.floor((this.y-this.h/2)/world.tileSize),Math.floor((this.x+this.w/2)/world.tileSize)],//top left
        ]
        var test = 0;
        var test2 = 0;
        alphaWall = false
        for(var x of rectTilePos){
            var index = x[0] * world.columns + x[1];
            if(world.map[1][0][index]!=0){
                this.collisionTiles[5](x[0],x[1],index);
                this.collidedTile = 5;
                this.collidedTileIndex = index;
                test = 1;
            }
        }
        for(var x of wallCheckTiles){
            var index = x[0] * world.columns + x[1];
            if(world.map[3][0][index]!=0){
                alphaWall=index;
            }
        }
        if(!test){
            this.collidedTile = 0
            this.collidedTileIndex = 0;
        }
    }
    inventory(){
        if(checkKey("KeyC")&&dialogueBoxHandler.queue.length <= 0){
            if(!this.invkey){
                this.invkey = true;
                if(!this.invopen){
                    this.invopen = true;
                    this.selecteditem = 0;
                }else{
                    this.invopen = false;
                }
            }
        }else{
            this.invkey = false;
        }
    }
    update(){
        this.center = [this.x+this.w/2,this.y+this.h/2]
        this.oldx = this.x;
        this.oldy = this.y;
        if(!this.invopen && dialogueBoxHandler.queue.length <= 0){
            this.input(world);
        }
        if(!this.noclip){
            this.collisions();

        }
        this.inventory();
    }
    input(){
        var vector = [0,0];
        var angle = 0;
        //calculating movement vector
        if(checkKey("ArrowRight")){
            vector[0] += 1;
            this.sprite.state = "right";
            angle = 180;
        }
        if(checkKey("ArrowLeft")){
            vector[0] -= 1;
            this.sprite.state = "left";
        }
        if(checkKey("ArrowUp")){
            vector[1] -= 1;
            this.sprite.state = "up";
        }
        if(checkKey("ArrowDown")){
            vector[1] += 1;
            this.sprite.state = "down";
        }

        //accounting for diagonal movement
        if(vector[0] != 0 && vector[1] != 0){
            vector[0] *= 0.707107;
            vector[1] *= 0.707107;
        }

        if(vector[0] != 0 || vector[1] != 0){
            this.walkingTimer += 1;
            if(this.walkingTimer > 13){
                this.stretch = 6;
                //particleManager.createExplosion(this.x+this.w/2,this.y+this.h-5,5,5,2,5,"#f1f1f0",angle);
                this.walkingTimer = 0;
            }
        }else{
            this.walkingTimer = 13;
        }
        for(var x in itemDict){
            if(this.collidedTile == x && checkKey("KeyZ") && !this.interactButtonDown){
                itemDict[x]();
                console.log(itemDict)
                break
            }
        }
        this.xv += vector[0] * this.speed;
        this.yv += vector[1] * this.speed;

        this.x += this.xv;
        this.y += this.yv;       
        
        this.xv *= 0.7;
        this.yv *= 0.7;
        
        if(this.noclip){
            this.speed = 5
        }else{
            this.speed = 1
        }

        if(checkKey('KeyV')&&!this.vKeyDown){
            if(this.noclip){this.noclip = false}
            else{this.noclip = true}
        }

        if(checkKey('KeyV')){this.vKeyDown=true}
        else{this.vKeyDown=false}
        if(checkKey("ShiftLeft")){
            this.speed = 2
        }else if(!this.noclip){
            this.speed = 1
        }
    }
    draw(){
        if(this.stretch > 0){
            this.stretch -= 1;
        
            this.drawoffset.y = lerp(this.drawoffset.y, -this.hstretch/2, 0.4);
            this.drawh = lerp(this.drawh, this.h*3+this.hstretch, 0.4);
            this.drawoffset.x = lerp(this.drawoffset.x, -this.wstretch/2, 0.4);
            this.draww = lerp(this.draww, this.w+this.wstretch, 0.4);
        
            
        }else{
            this.drawoffset.y = lerp(this.drawoffset.y, 0, 0.4);
            this.drawh = lerp(this.drawh, this.h*3, 0.4);
            this.drawoffset.x = lerp(this.drawoffset.x, 0, 0.4);
            this.draww = lerp(this.draww, this.w, 0.4);
            this.longstretch = false;
        }
        this.sprite.x = this.x+this.drawoffset.x;
        this.sprite.y = this.y+this.drawoffset.y-this.h * 2;
        this.sprite.draww = this.draww;
        this.sprite.drawh = this.drawh;

        this.sprite.draw(1);
        this.sprite.frameCalc(1);
        //drawRect(this.x,this.y,this.w,this.h,"red",1,'red',1)

        //drawRect(this.interactHitbox.x,this.interactHitbox.y,this.interactHitbox.w,this.interactHitbox.h,"blue",1,"blue",0.4)
        //drawRect(this.x,this.y,this.w,this.h,"red",1,"red",1);
        c.save();
        if(this.invopen){
            drawRect(Camera.x+40,Camera.y+40,200,200,"",1,"black",0.8);
            var temp = 1;
            if(this.selecteditem <= this.inv.length){
                if(!this.keydown&&dialogueBoxHandler.queue.length <= 0){
                    if(this.selecteditem+1 < this.inv.length && checkKey("ArrowDown")){this.selecteditem++;}
                    if(this.selecteditem > 0 && checkKey("ArrowUp")){this.selecteditem--;}
                }
                
                c.lineWidth = 4;
                drawRect(Camera.x+40,Camera.y+40+30*this.selecteditem,200,30,"white",0,"",1);

                if(!this.keydown && checkKey("KeyZ")&&dialogueBoxHandler.queue.length <= 0){
                    genericItem(this.inv[this.selecteditem].useText);
                }

                if(checkKey("ArrowDown") || checkKey("ArrowUp") || checkKey("KeyZ")){this.keydown=true}
                else{this.keydown=false}
                showText(this.inv[this.selecteditem].description,Camera.x+380,Camera.y+60,20);
            }
            for(var x of this.inv){
                showText(x.name,Camera.x+50,Camera.y+60+30*(temp-1),20,"white");
                temp+=1;
            }
            
        }
        c.restore();
        
        if(checkKey("KeyZ")){this.interactButtonDown=true}
        else{this.interactButtonDown=false}
    }
}