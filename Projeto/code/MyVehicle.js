/**
 * MyVehicle
 * @constructor
 */

 class MyVehicle extends CGFobject {

    constructor(scene)
    {
        super(scene);
        
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
        
        this.bodyAppearance = new CGFappearance(scene);

        this.bodyAppearance.loadTexture("../resources/images/blue.png");

        this.blueAppearance = new CGFappearance(scene);
        this.blueAppearance.loadTexture("../resources/images/blue.png");

        this.whiteAppearance = new CGFappearance(scene);
        this.whiteAppearance.loadTexture("../resources/images/white.png");


        this.bumperAppearance = new CGFappearance(scene);
        this.bumperAppearance.loadTexture("../resources/images/gray.jpg");

        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(70 / 255, 71 / 255, 73 / 255, 1);
    }

    display()
    {
        this.scene.translate(10, 0, 10);
        

       
        /*
        comprimento: 5.0
        largura: 2.5
        dist.eixos: 3.0
        diam.rodas: 1.0
        altura: 2.0
        */
        
        //PLATE
        //FRONT
        this.scene.pushMatrix();       
        this.scene.translate(6.1, 0.6, 1.5);
        this.scene.scale(0.001, 0.15, 0.75);
        this.plate.display();
        this.scene.popMatrix();
        //BACK
        this.scene.pushMatrix();       
        this.scene.translate(0.39, 0.55, 1.5);
        this.scene.scale(0.0001, 0.15, 0.75);
        this.plate.display();
        this.scene.popMatrix();


        //GRILL
        this.scene.pushMatrix();       
        this.scene.translate(6, 1.15, 1.5);
        this.scene.scale(0.001, 0.40, 1.4);
        this.grill.display();
        this.scene.popMatrix();

        //REARLIGHTS
        //LEFT
        this.scene.pushMatrix();       
        this.scene.translate(0.5, 0.8, 0.5);
        this.scene.scale(0.01,0.2,0.5);
        this.rearlight.display();
        this.scene.popMatrix();
        //RIGHT
        this.scene.pushMatrix();       
        this.scene.translate(0.5, 0.8, 2.5);
        this.scene.scale(0.01,0.2,0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.rearlight.display();
        this.scene.popMatrix();


        //headlights
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
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(4.4, 0, 2.0);
        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();


        // carrosserie
        //top part
        this.scene.pushMatrix();
        this.scene.translate(2.0, 1.8, 1.5);
        this.scene.scale(3., 1.4, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        //back wheel-fender
        //back
        this.scene.pushMatrix();
        this.scene.translate(0.75, 1, 1.5);
        this.scene.scale(0.5, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        //front
        this.scene.pushMatrix();
        this.scene.translate(2.9, 1, 1.5);
        this.scene.scale(1, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
       
        //middle part
        this.scene.pushMatrix();
        this.scene.translate(3.7, 1, 1.5);
        this.scene.scale(1, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        
        //front part
        this.scene.pushMatrix();
        this.scene.translate(5.75, 1, 1.5);
        this.scene.scale(0.5, 1, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        

        //inside cube
        this.scene.pushMatrix();
        this.scene.translate(3, 1, 1.5);
        this.scene.scale(4.9, 1, 1.8);
        this.bumperAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        //BUMPERS
        //FRONTBUMPER
        this.scene.pushMatrix();
        this.scene.translate(5.9, 0.6, 1.5);
        this.scene.scale(0.4, 0.3, 2.7);
        this.bumperAppearance.apply();
        this.bumper.display();
        this.scene.popMatrix();
        //REARBUMPER 
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.55, 1.5);
        this.scene.scale(0.4, 0.3, 2.7);
        this.bumper.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

       


        //FENDERS
        //back fenders
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
                
        //front fenders 
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

        //FENDERS COVERS BACK
        //front right
        this.scene.pushMatrix();
        this.scene.translate(2.4, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);    
        this.fendercover.display();
        this.scene.popMatrix();
        //front left
        this.scene.pushMatrix();
        this.scene.translate(2.4, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);          
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.popMatrix();
        //back right
        this.scene.pushMatrix();
        this.scene.translate(1, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);     
        this.fendercover.display();
        this.scene.popMatrix();
        //back left
        this.scene.pushMatrix();
        this.scene.translate(1, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);           
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fendercover.display();
        this.scene.popMatrix();

        //FENDERS COVERS BACK
        //front right
        this.scene.pushMatrix();
        this.scene.translate(5.5, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);       
      
        this.fendercover.display();
   
        this.scene.popMatrix();
        //front left
        this.scene.pushMatrix();
        this.scene.translate(5.5, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);          
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
      
        this.fendercover.display();
    
        this.scene.popMatrix();
        //back right
        this.scene.pushMatrix();
        this.scene.translate(4.2, 1,2.75);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);     
     
        this.fendercover.display();
      
        this.scene.popMatrix();
        //back left
        this.scene.pushMatrix();
        this.scene.translate(4.2, 1,0.25);
        this.scene.scale(0.5,0.5,2.5);
        this.scene.rotate(0.53, 0, 0, 1);           
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
   
        this.fendercover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();




        //front body
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.3, 1.5);
        this.scene.scale(3.0, 0.4, 2.5);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
        

        //HOOD COMPONENTS
        //hood_main
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.5, 1.5);
        this.scene.scale(2.5, 0.25, 1.6);
        this.bodyAppearance.apply();
        this.hood.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();



/*Estas cenas nao pintam*/
        //hood_right
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 0.7);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.hoodright.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        //hood_left
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.hoodleft.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
/* ate aqui */





        //hood_left cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.lefthoodcover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        //hood_right cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 0.70);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.bodyAppearance.apply();
        this.righthoodcover.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        //front window rectangle
        this.scene.pushMatrix();
        this.scene.translate(4.22, 1.527, 1.5);
        this.scene.scale(0.2, 0.2, 2.5);
        this.bodyAppearance.apply();
        this.frontwindowrectangle.display();
       
        this.scene.popMatrix();


        //window thing
        this.scene.pushMatrix();
        this.scene.translate(3.75, 1.63, 0.25);
        this.scene.scale(0.5,1,2.5);
        this.front.display();
        this.scene.popMatrix();


        //front a-pillars (right and left)
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


        
        // windows
        //front windows
        this.scene.pushMatrix();
        this.scene.translate(0.499, 2.0, 1.5);
        this.scene.scale(1.5, 0.6, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.windowAppearance.apply();
        this.window.display();
        this.scene.popMatrix();
        //back window
        this.scene.pushMatrix();
        this.scene.translate(3.85, 2.1, 1.5);
        this.scene.scale(1.0, 1.0, 2.3);
        this.scene.rotate(0.70, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.window.display();
        this.scene.popMatrix();
        //right hand-side windows
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

        //left hand-side windows
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
       // back wheel

        this.scene.pushMatrix();
        this.scene.translate(0.5, 1.3, 1.2);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();



    };  
 };