class ParticleHandler{
    constructor(){
        this.particles = [];
        //x, y, w, h, color, startalpha, angle, speed, lifespaninframes, fadeoutrate, type//
    }
    draw(){
        for(var x of this.particles){
            if(x[5] > 0){
                x[5] -= x[9];
            }
            if (x[5] < 0){
                x[5] = 0;
            }
            if(AABBCollision(x[0],x[1],10,10,Camera.x,Camera.y,w,h)){
                drawRect(x[0],x[1],x[2],x[3],x[4],true,x[4],x[5]);
            }
        }
    }
    createExplosion(xpos, y, w, h,speed,numberofparticles, color,angle="random",ls=100){
        for(var x = 0; x < numberofparticles; x++){
            
            var lifespan = ls * Math.random() * Math.random();
            //x,y,w,h,color,startingalpha,angleindegrees,speed,numberofparticles,lifespan,lifespan/1,type//
            if(angle == "random"){
                this.particles.push([xpos,y,w,h,color,1,Math.PI*x*Math.random(),speed*Math.random(),lifespan, 1 / lifespan, "explosion"]);
            }else{
                var temp = angle + Math.round(random(-10, 10));
                temp *= (Math.PI/180)
                this.particles.push([xpos,y,w,h,color,1,temp,speed*Math.random(),lifespan, 1 / lifespan, "explosion"]);
            }

        }
    }
    createFire(num, rgb, xpos, y, w, h,ls){
        for(var x = 0; x < num; x++){
            var lifespan = ls * (Math.random() * Math.random());
            if(Math.random() < 0.13){
                var randomnum = Math.PI * (1.0 + (random(30,80)*0.01));
            }else{
                var randomnum = Math.PI * (1.0 + (random(45,66)*0.01))
            }
            this.particles.push([xpos, y, w, h,rgb, 1, randomnum,0.5*Math.random(),lifespan,1/lifespan,"fire",y,])
        }
    }
    update(){
        var particlestoremove = [];
        for(var x of this.particles){
            if(x[10] == "explosion"){
                var dx = Math.cos(x[6]);
                var dy = Math.sin(x[6]);
                x[0] += dx * x[7];
                x[1] += dy * x[7];
                x[8] -= 1;
                if(x[8] <= 0){
                    particlestoremove.push(x);
                }
            }
            if(x[10] == "fire"){
                var dx = Math.cos(x[6]);
                var dy = Math.sin(x[6]);
                x[0] += dx * x[7];
                x[1] += dy * x[7];
                x[8] -= 1;
                if(x[1] < x[11] - x[3]*3){
                    x[4] = interpolateRGB(x[4], new RGB(100,100,100),1,10) 
                }
                else if(x[1] < x[11]-(x[3])){
                    x[4] = interpolateRGB(x[4], new RGB(255,0,0),1,10) 
                }else{
                    x[4] = interpolateRGB(x[4], new RGB(255,255,0),1,8) 
                }
                
                if(x[8] <= 0){
                    particlestoremove.push(x);
                }
                
            }
        }
        for(var x of particlestoremove){
            this.particles = arrayRemove(this.particles,x);
        }
    }
}
var particleManager = new ParticleHandler();