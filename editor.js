var grid = [];
if(grid[0]==undefined){
    for(var x=0;x<10000;x++){
        grid.push(0);
    }
}

console.log(grid)
var type = 1;
function editor(){
    canvas.height = w;
    h = w;
    drawRect(0+Camera.x,0+Camera.y,w/Camera.scale,h/Camera.scale,"white",true,"white",bgalpha);
    var xnum = 0;
    var ynum = 0;
    for(var x of grid){
        if(x == 1){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100),4,8,"blue",1,"blue",1,false);
        }
        if(x == 2){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100)+4,ynum*(h/100),4,8,"blue",1,"blue",1,false);
        }
        if(x == 3){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100)+4,8,4,"blue",1,"blue",1,false);
        }
        if(x == 4){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100),8,4,"blue",1,"blue",1,false);
        }
        if(x == 5){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",1,false);
        }
        if(x == 6){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100),8,4,"blue",1,"blue",1,false);
            drawRect(xnum*(w/100),ynum*(h/100),4,8,"blue",1,"blue",1,false);
        }
        if(x == 7){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100),8,4,"blue",1,"blue",1,false);
            drawRect(xnum*(w/100)+4,ynum*(h/100),4,8,"blue",1,"blue",1,false);
        }
        if(x == 8){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100)+4,ynum*(h/100),4,8,"blue",1,"blue",1,false);
            drawRect(xnum*(w/100),ynum*(h/100)+4,8,4,"blue",1,"blue",1,false);
        }
        if(x == 9){
            drawRect(xnum*(w/100),ynum*(h/100),8,8,"blue",1,"blue",0.4,false);
            drawRect(xnum*(w/100),ynum*(h/100),4,8,"blue",1,"blue",1,false);
            drawRect(xnum*(w/100),ynum*(h/100)+4,8,4,"blue",1,"blue",1,false);
        }
        
        xnum++;
        if(xnum >= 100){
            ynum++;
            xnum = 0;
        }
    }

    if(mouse.button.left){
        grid[Math.floor(mouse.y/8)*100+Math.floor(mouse.x/8)] = type
        console.log(type)
        
    }
    var wallTypes = 10
    for(var x=0;x<wallTypes;x++){
        if(checkKey("Digit"+x)){type=x};
    }
    if(checkKey("Digit0")){type=0}
    if(checkKey("Space")){
        var output = '[';
        for(var x of grid){
            output+=x;
            output+=",";
        }
        output+="]"
        console.log(output);
    }
}