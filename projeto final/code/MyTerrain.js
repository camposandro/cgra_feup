/**
 * MyTerrain
 * @constructor
 */

class MyTerrain extends CGFobject {

    constructor(scene, width, height, altimetry)
    {
        super(scene);

        this.width = width;
        this.height = height;
        this.altimetry = altimetry;
                
        this.terrain = new Plane(scene, altimetry.length - 1, 0, 15, 0, 15, altimetry);
    };

    display()
    {
        // update terrain appearance
        this.currTerrainAppearance = this.scene.terrainAppearancesList[this.scene.terrainAppearance];

        this.scene.pushMatrix();
        
        this.scene.translate(this.width / 2, 0, this.width / 2);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(this.width, this.height, 1);

        this.scene.terrainAppearances[this.currTerrainAppearance].apply();
        this.terrain.display();
        this.scene.materialDefault.apply();

        this.scene.popMatrix();
    };
};