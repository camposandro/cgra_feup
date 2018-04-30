/**
 * MyVehicle
 * @constructor
 */

 class MyVehicle extends CGFobject {

    constructor(scene)
    {
        super(scene);

        this.wheel = new MyWheel(scene);
        this.body = new MyUnitCubeQuad(scene);
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


        this.back = new MyCilinder(scene, 30, 1);
        this.wheelRim = new MyCircle(scene, 30);
        this.window = new Plane(scene, 1, -0.5, 0.5, -0.5, 0.5);

        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(70 / 255, 71 / 255, 73 / 255, 1);
    }

    display()
    {
        this.scene.translate(10, 0, 10);

        /*
        comprimento: 4.0
        largura: 2.5
        dist.eixos: 3.0
        diam.rodas: 1.0
        altura: 2.0
        */

        
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
        this.scene.translate(4.5, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(4.5, 0, 2.0);
        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();

        // carrosserie
        this.scene.pushMatrix();
        this.scene.translate(2.0, 1.5, 1.5);
        this.scene.scale(3., 2.0, 2.5);
        this.body.display();
        this.scene.popMatrix();

        //front body
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.0, 1.5);
        this.scene.scale(3.0, 1.0, 2.5);
        this.body.display();
        this.scene.popMatrix();
        

        //HOOD COMPONENTS
        //hood_main
        this.scene.pushMatrix();
        this.scene.translate(4.5, 1.5, 1.5);
        this.scene.scale(2.5, 0.25, 1.6);
        this.hood.display();
        this.scene.popMatrix();

        //hood_right
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 0.7);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.hoodright.display();
        this.scene.popMatrix();

        //hood_left
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.62, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.hoodleft.display();
        this.scene.popMatrix();

        //hood_left cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 2.3);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.lefthoodcover.display();
        this.scene.popMatrix();

        //hood_right cover
        this.scene.pushMatrix();
        this.scene.translate(4.7, 1.625, 0.70);
        this.scene.scale(1.05, 0.2, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.righthoodcover.display();
        this.scene.popMatrix();

        //front window rectangle
        this.scene.pushMatrix();
        this.scene.translate(4.22, 1.527, 1.5);
        this.scene.scale(0.2, 0.2, 2.5);
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
        this.scene.popMatrix();


        
        // windows
        this.scene.pushMatrix();
        this.scene.translate(0.499, 2.0, 1.5);
        this.scene.scale(1.5, 0.6, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.windowAppearance.apply();
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.85, 2.1, 1.5);
        this.scene.scale(1.0, 1.0, 2.3);
        this.scene.rotate(0.70, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.window.display();
 
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // back wheel
        this.scene.pushMatrix();
        this.scene.translate(0.5, 1.3, 1.2);
        this.scene.scale(1/3, 0.6, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.back.display();
        this.scene.translate(0, 0, 1);
        this.wheelRim.display();
        this.scene.popMatrix();
    };  
 };