/**
 * MySky
 * @constructor
 */

class MySky extends CGFobject {

    constructor(scene, width, height) 
    {
        super(scene);

        this.width = width;
        this.height = height;

        this.sky = new MyQuad(scene, -0.5, 1.5, -0.5, 1.5);
    };

    display()
    {
        // Left Wall
        this.scene.pushMatrix();
        this.scene.translate(0, this.height / 2, this.width / 2);
        this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.scene.scale(this.width, this.height, 0.2);
        this.scene.skyAppearance.apply();
        this.sky.display();
        this.scene.popMatrix();

        // Plane Wall
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2, this.height / 2, 0);
        this.scene.scale(this.width, this.height, 0.2);
        this.sky.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };

};