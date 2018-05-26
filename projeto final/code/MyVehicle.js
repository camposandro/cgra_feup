/**
 * MyVehicle
 * @constructor
 */

 class MyVehicle extends CGFobject {

    constructor(scene)
    {
        super(scene);
       
        // car parts & windows appearance
        this.rearlight = new MyRearlight(scene);
        this.headlight = new MyHeadlight(scene);
        this.wheel = new MyWheel(scene);
        this.body = new MyUnitCubeQuad(scene);
        this.bumper = new MyUnitCubeQuad(scene);
        this.front = new MyPrism(scene, 3, 1);
        this.frontbody = new MyUnitCubeQuad(scene);
        this.triangle1 = new MyCircle(scene, 3);
        this.triangle2 = new MyCircle(scene, 3);
        this.hood = new MyUnitCubeQuad(scene);
        this.hoodleft = new MyPrism(scene,3,1);
        this.hoodright = new MyPrism(scene,3,1);
        this.righthoodcover = new MyCircle(scene, 3);
        this.lefthoodcover = new MyCircle(scene, 3);
        this.frontwindowrectangle = new MyUnitCubeQuad(scene);
        this.fender = new MyPrism(scene, 3, 1);       
        this.fendercover = new MyCircle(scene, 3);
        this.back = new MyCilinder(scene, 30, 1);
        this.wheelRim = new MyCircle(scene, 30);
        this.window = new Plane(scene, 1, -0.5, 0.5, -0.5, 0.5);
        this.grill = new MyGrill(scene);        
        this.plate = new MyPlate(scene);
        this.triangwindow = new MyCircle(scene, 3);

        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(70 / 255, 71 / 255, 73 / 255, 1);

        // car's initial position
        this.pos = this.getInitPos(); 

        // map's limit position
        this.limitPos = new Array(20, 0, 20);

        this.vel = 0;                       // vehicle velocity
        this.ang = 0;                       // vehicle angle of rotation
        this.angWheels = 0;                 // wheels angle of rotation
    }

    getInitPos() {
        var altimetry = this.scene.altimetry;
        var altimetryWidth = altimetry.length - 1;
        var altimetryHeight = altimetry[0].length - 1;

        var posX, posZ;
        var found = false;
        for (var i = 0; i < altimetryWidth; i++) {
               for (var j = 0; j < altimetryHeight; j++) {
                       if (altimetry[i][j] == 0) {
                               posX = i * Math.ceil(TERRAIN_WIDTH / altimetryWidth);
                               posX -= TERRAIN_WIDTH / 2;
                               posZ = j * Math.ceil(TERRAIN_HEIGHT / altimetryHeight);
                               posZ -= TERRAIN_HEIGHT / 2;
                               return new Array(posX , 0, posZ + 2);
                        }
                }
        }
    }

    display()
    {   
        this.scene.pushMatrix();
            
        // update vehicle appearance
        this.currVehicleAppearance = this.scene.appearancesList[this.scene.vehicleAppearance];
        
        this.bodyAppearance = this.scene.appearances[this.currVehicleAppearance];

        // updating vehicle position
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
 
        this.scene.pushMatrix();
                
        // updating vehicle orientation
        this.scene.rotate(this.ang * Math.PI / 180, 0, 1, 0);
        this.scene.translate(-2,0,-1.5);
 
        /*
        comprimento: 5.0
        largura: 2.5
        dist.eixos: 3.0
        diam.rodas: 1.0
        altura: 2.0
        */
        
        // PLATE
        // front
        this.scene.pushMatrix();       
        this.scene.translate(6.1, 0.6, 1.5);
        this.scene.scale(0.001, 0.15, 0.75);
        this.plate.display();
        this.scene.popMatrix();

        // back
        this.scene.pushMatrix();       
        this.scene.translate(0.39, 0.55, 1.5);
        this.scene.scale(0.0001, 0.15, 0.75);
        this.plate.display();
        this.scene.popMatrix();

        // GRILL
        this.scene.pushMatrix();       
        this.scene.translate(6, 1.15, 1.5);
        this.scene.scale(0.001, 0.40, 1.4);
        this.grill.display();
        this.scene.popMatrix();

        // REAR LIGHTS
        // left
        this.scene.pushMatrix();       
        this.scene.translate(0.5, 0.8, 0.5);
        this.scene.scale(0.01,0.2,0.5);
        this.rearlight.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();       
        this.scene.translate(0.5, 0.8, 2.5);
        this.scene.scale(0.01,0.2,0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.rearlight.display();
        this.scene.popMatrix();

        // HEADLIGHTS
        this.scene.pushMatrix();       
        this.scene.translate(6.01, 1.2, 0.55);
        this.scene.scale(0.45,0.35,0.45);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.headlight.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();       
        this.scene.translate(6.01, 1.2, 2.45);
        this.scene.scale(0.45,0.35,0.45);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.headlight.display();
        this.scene.popMatrix();

        // WHEELS
        // back wheels
        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(1.2, 0, 0.0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(1.2, 0, 2.0);
        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();

        // front wheels
        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(4.4, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);

        this.wheel.setAngle(-this.angWheels);

        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(4.4, 0, 2.0);
        
        this.wheel.setAngle(this.angWheels);

        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();

        // back spare wheel
        this.scene.pushMatrix();
        this.scene.translate(0.5, 1.3, 1.2);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();

        // CARROSSERIE
        // top part
        this.scene.pushMatrix();
        this.scene.translate(2.0, 1.8, 1.5);
        this.scene.scale(3., 1.4, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // back wheel-fender
        // back
        this.scene.pushMatrix();
        this.scene.translate(0.75, 1, 1.5);
        this.scene.scale(0.5, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // front
        this.scene.pushMatrix();
        this.scene.translate(2.9, 1, 1.5);
        this.scene.scale(1, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
       
        // middle part
        this.scene.pushMatrix();
        this.scene.translate(3.7, 1, 1.5);
        this.scene.scale(1, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        
        // front part
        this.scene.pushMatrix();
        this.scene.translate(5.75, 1, 1.5);
        this.scene.scale(0.5, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        
        // inside cube
        this.scene.pushMatrix();
        this.scene.translate(3, 1, 1.5);
        this.scene.scale(4.9, 1, 1.8);
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // BUMPERS
        // front
        this.scene.pushMatrix();
        this.scene.translate(5.9, 0.6, 1.5);
        this.scene.scale(0.4, 0.3, 2.7);
        this.bumper.display();
        this.scene.popMatrix();

        // rear 
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.55, 1.5);
        this.scene.scale(0.4, 0.3, 2.7);
        this.bumper.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // FENDERS
        // back
        this.scene.pushMatrix();
        this.scene.translate(1, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);       
        this.bodyAppearance.apply();
        this.fender.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.4, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);      
        this.fender.display();
        this.scene.popMatrix();
                
        // front 
        this.scene.pushMatrix();
        this.scene.translate(5.5, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);       
        this.fender.display();       
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4.2, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);       
        this.fender.display();      
        this.scene.popMatrix();

        // FENDERS COVERS BACK
        // front right
        this.scene.pushMatrix();
        this.scene.translate(2.4, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);    
        this.fendercover.display();
        this.scene.popMatrix();

        // front left
        this.scene.pushMatrix();
        this.scene.translate(2.4, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);          
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.popMatrix();

        // back right
        this.scene.pushMatrix();
        this.scene.translate(1, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);     
        this.fendercover.display();
        this.scene.popMatrix();

        // back left
        this.scene.pushMatrix();
        this.scene.translate(1, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);           
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.popMatrix();

        // front right
        this.scene.pushMatrix();
        this.scene.translate(5.5, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);       
        this.fendercover.display();
        this.scene.popMatrix();

        // front left
        this.scene.pushMatrix();
        this.scene.translate(5.5, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);          
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.popMatrix();

        // back right
        this.scene.pushMatrix();
        this.scene.translate(4.2, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);     
        this.fendercover.display();
        this.scene.popMatrix();

        // back left
        this.scene.pushMatrix();
        this.scene.translate(4.2, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);           
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // front body
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.3, 1.5);
        this.scene.scale(3.0, 0.4, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        
        // HOOD COMPONENTS
        // hood_main
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.5, 1.5);
        this.scene.scale(2.5, 0.25, 1.6);
        this.bodyAppearance.apply();
        this.hood.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // hood_right
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 0.7);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.hoodright.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // hood_left
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.hoodleft.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // hood_left cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.lefthoodcover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // hood_right cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 0.70);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.righthoodcover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // front window rectangle
        this.scene.pushMatrix();
        this.scene.translate(4.22, 1.527, 1.5);
        this.scene.scale(0.2, 0.2, 2.5);
        this.bodyAppearance.apply();
        this.frontwindowrectangle.display();
        this.scene.popMatrix();

        // window thing
        this.scene.pushMatrix();
        this.scene.translate(3.75, 1.63, 0.25);
        this.scene.scale(0.5,1,2.5);
        this.front.display();
        this.scene.popMatrix();

        // front a-pillars (right and left)
        this.scene.pushMatrix();
        this.scene.translate(3.75,1.64,2.75);
        this.scene.scale(0.5,1,2.5)
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.75,1.64,0.25);
        this.scene.scale(0.5,1,2.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.triangle2.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // WINDOWS
        // front
        this.scene.pushMatrix();
        this.scene.translate(0.499, 2.0, 1.5);
        this.scene.scale(1.5, 0.6, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.windowAppearance.apply();
        this.window.display();
        this.scene.popMatrix();

        // back
        this.scene.pushMatrix();
        this.scene.translate(3.85, 2.1, 1.5);
        this.scene.scale(1.0, 1.0, 2.3);
        this.scene.rotate(0.70, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.window.display();
        this.scene.popMatrix();

        // right hand-side
        this.scene.pushMatrix();
        this.scene.translate(3.2, 2.0, 2.76);
        this.scene.scale(0.6, 0.7, 2.3);
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 2, 2.76);
        this.scene.scale(0.9, 0.7, 2.3);
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.36, 2, 2.76);
        this.scene.scale(0.9, 0.7, 2.3);
        this.window.display();
        this.scene.popMatrix();

        // left hand-side
        this.scene.pushMatrix();
        this.scene.translate(3.2, 2.0, 0.24);
        this.scene.scale(0.6, 0.7, 2.3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 2, 0.24);
        this.scene.scale(0.9, 0.7, 2.3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.36, 2, 0.24);
        this.scene.scale(0.9, 0.7, 2.3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.window.display();
        this.scene.popMatrix();
        this.scene.materialDefault.apply();

        this.scene.popMatrix();

        this.scene.popMatrix();
    };

    verifyMapBounds(pos, limitPos) {
         
         var inBounds = true;   
         
         if(pos[0] > limitPos[0]) {
               pos[0] = limitPos[0];
               inBounds = false;  
         }        
         else if (pos[0] < -limitPos[0]) {
                pos[0] = -limitPos[0];
                inBounds = false; 
         }
          
         if(this.pos[2] > this.limitPos[2]) {
                 pos[2] = limitPos[2];
                 inBounds = false; 
         }     
         else if (pos[2] < -limitPos[2]) {
                 pos[2] = -limitPos[2];
                 inBounds = false;
         }
         
         if (!inBounds) 
                this.vel = 0;
    }

    getCollisionIndices(deltaX, deltaZ) {
        
        var nrDivWidth = this.scene.altimetry.length;
        var nrDivHeight = this.scene.altimetry[0].length;
        
        var indX = this.pos[0] + TERRAIN_WIDTH / 2;
        indX = Math.floor(indX / TERRAIN_WIDTH * nrDivWidth);
        if (deltaX < 0) 
                indX--;
        else if (deltaX > 0) 
                indX++;
        
        var indZ = this.pos[2] + TERRAIN_HEIGHT/ 2;
        indZ = Math.floor(indZ / TERRAIN_HEIGHT * nrDivHeight);
        if (deltaZ < 0) 
                indZ--;
        else if (deltaZ > 0)
                indZ++;

        if (indX < 0) 
                indX = 0;
        else if (indX >= nrDivWidth) 
                indX = nrDivWidth - 1;
        if (indZ < 0)
                indZ = 0;
        else if (indZ >= nrDivHeight) 
                indZ = nrDivHeight - 1;

        return Array(indX, indZ);
    }

    update(interval)
    {
        var time = interval / 1000;
        var angle = degToRad * this.ang;

        var deltaX = this.vel * Math.cos(angle);

        angle %= 90;
        angle = -angle;

        var deltaZ = this.vel * Math.sin(angle);

        var collisionIndices = this.getCollisionIndices(deltaX, deltaZ);
        var indX = collisionIndices[0], indZ = collisionIndices[1];

        // verifying collisions
        if (this.scene.collisions && this.scene.altimetry[indX][indZ] > 0) {
                this.vel = 0;
        } else {     
                // update vehicle's x pos              
                this.pos[0] += deltaX;

                // update vehicle's z pos
                this.pos[2] += deltaZ;

                this.verifyMapBounds(this.pos, this.limitPos);
        }
    }
 };