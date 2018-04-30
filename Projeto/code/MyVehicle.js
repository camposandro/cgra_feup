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
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(0, 0, 2.0);
        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();

        // front wheels
        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(3.0, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1/2, 1/2, 1/2);
        this.scene.translate(3.0, 0, 2.0);
        this.wheel.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.popMatrix();

        // carrosserie
        this.scene.pushMatrix();
        this.scene.translate(2.0, 2.0, 1.5);
        this.scene.scale(4.0, 2.0, 2.5);
        this.body.display();
        this.scene.popMatrix();

        // windows
        this.scene.pushMatrix();
        this.scene.translate(0, 2.3, 1.5);
        this.scene.scale(1.5, 1.0, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.windowAppearance.apply();
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4.0, 2.5, 1.5);
        this.scene.scale(1.0, 0.8, 2.3);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.window.display();
 
        this.scene.materialDefault.apply();
        this.scene.popMatrix();

        // back wheel
        this.scene.pushMatrix();
        this.scene.translate(0, 1.8, 1.2);
        this.scene.scale(1/3, 0.6, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.back.display();
        this.scene.translate(0, 0, 1);
        this.wheelRim.display();
        this.scene.popMatrix();
    };  
 };