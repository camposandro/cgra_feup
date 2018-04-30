/**
 * MyTerrain
 * @constructor
 */

class MyTerrain extends CGFobject {

    constructor(scene, width, height)
    {
        super(scene);

        this.width = width;
        this.height = height;
        
        this.terrain = new MyQuad(scene, 0, 10, 0, 12);
    };

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2, 0, this.width / 2);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(this.width, this.height, 0.2);
        this.scene.terrainAppearance.apply();
        this.terrain.display();
        this.scene.materialDefault.apply();
        this.scene.popMatrix(); 
    };
};