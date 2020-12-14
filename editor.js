var grid = [];
if(grid[0]==undefined){
    for(var x=0;x<10000;x++){
        grid.push(0);
    }
}

console.log(grid)
var type = [];
function editor(){
    canvas.height = w;
    h = w;
    drawRect(0+Camera.x,0+Camera.y,w/Camera.scale,h/Camera.scale,"white",true,"white",bgalpha);
    var xnum = 0;
    var ynum = 0;
    for(var x of grid){
        if(x!=0){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            for(var i of x){
                if(i == 1){
                    drawRect(xnum*(w/100),ynum*(h/100),2,8,"blue",1,"blue",1,false);
                }
                if(i == 2){
                    drawRect(xnum*(w/100)+6,ynum*(h/100),2,8,"blue",1,"blue",1,false);
                }
                if(i == 3){
                    drawRect(xnum*(w/100),ynum*(h/100)+6,8,2,"blue",1,"blue",1,false);
                }
                if(i == 4){
                    drawRect(xnum*(w/100),ynum*(h/100),8,2,"blue",1,"blue",1,false);
                }
            }
        }
        
        
        xnum++;
        if(xnum >= 100){
            ynum++;
            xnum = 0;
        }
    }

    if(mouse.button.left){
        grid[Math.floor(mouse.y/8)*100+Math.floor(mouse.x/8)] = type;
    }

    if(type!==0){
        if(checkKey("Digit1")){
            type = arrayRemove(type,1);
            type.push(1);
        }
        if(checkKey("Digit2")){
            type = arrayRemove(type,2);
            type.push(2);
        }
        if(checkKey("Digit3")){
            type = arrayRemove(type,3);
            type.push(3);
        }
        if(checkKey("Digit4")){
            type = arrayRemove(type,4);
            type.push(4);
        }
    }
    
    if(checkKey("KeyR")){type=[]}
    if(checkKey("Digit0")){type=0}
    if(checkKey("Space")){
        var output = '[';
        for(var x of grid){
            if(x!=0&&x[0]!=undefined){
                output+='['
                for(var i of x){
                    output+=i;
                    output+=','
                }
                output+=']'
            }else{
                output+=x;
            }
            output+=",";
        }
        output+="]"
        console.log(output);
    }
}