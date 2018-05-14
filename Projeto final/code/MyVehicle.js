/**
 * MyVehicle
 * @constructor
 */

 class MyVehicle extends CGFobject {

    constructor(scene)
    {
        super(scene);
       
        this.vel = 0;                       // velocity
        this.ang = 0;                       // angle of rotation
        this.turning = false;               // car turning condition variable      
        this.initPos = new Array(5,5);      // car's initial position
        this.limitPos = new Array(45,45);   // map's limit position
        this.pos = new Array(3,3);          // car's front wheels initial position

        // car parts
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

        this.bumperAppearance = new CGFappearance(scene);
        this.bumperAppearance.loadTexture("../resources/images/gray.jpg");

        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(70 / 255, 71 / 255, 73 / 255, 1);
    }

    display()
    {
        // update vehicle appearance
        this.currVehicleAppearance = this.scene.vehicleAppearancesList[this.scene.vehicleAppearance];
        
        this.bodyAppearance = this.scene.vehicleAppearances[this.currVehicleAppearance];
        if (this.bodyAppearance == null)
            this.bodyAppearance = this.scene.materialDefault;

        // updating vehicle position
        this.scene.translate(this.pos[0], 0, this.pos[1]);
        
        // updating vehicle orientation
        this.scene.rotate(this.ang * Math.PI / 180, 0, 1, 0);
        this.scene.translate(-2.5, 0, -1.5);

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

        if (this.turning) 
           this.wheel.setAngle(-this.ang);

        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(4.4, 0, 2.0);

        if (this.turning) 
            this.wheel.setAngle(this.ang);

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
        this.bumperAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // BUMPERS
        // front
        this.scene.pushMatrix();
        this.scene.translate(5.9, 0.6, 1.5);
        this.scene.scale(0.4, 0.3, 2.7);
        this.bumperAppearance.apply();
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

        /*Estas cenas nao pintam*/
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
        /* ate aqui */

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
    };  

    update(interval)
    {
        var time = interval / 1000;
        var angle = degToRad * this.ang
        
        // update vehicle's x pos              
        this.pos[0] += this.vel * Math.cos(angle);

        if (this.pos[0] < this.initPos[0]) {
            this.pos[0] = this.initPos[0];
            this.vel = 0;
        }
        else if (this.pos[0] > this.limitPos[0]) {
            this.pos[0] = this.limitPos[0];
            this.vel = 0;
        }

        // update vehicle's z pos
        angle %= 90;
        angle = -angle;

        this.pos[1] += this.vel * Math.sin(angle);
        
        if (this.pos[1] < this.initPos[1]) {
            this.pos[1] = this.initPos[1];
            this.vel = 0;
        }
        else if (this.pos[1] > this.limitPos[1]) {
            this.pos[1] = this.limitPos[1];
            this.vel = 0;
        }

        console.log("vel = " + this.vel);
        console.log("posX = " + this.pos[0] + ", posZ = " + this.pos[1]);
    }
 };