/**
 * MyTerrain
 * @constructor
 */

class MyTerrain extends Plane {

    constructor(scene, width, height, nrDiv, altimetry)
    {
        super(scene, altimetry.length - 1, 0, 15, 0, 15, altimetry);

        this.width = width;
        this.height = height;
    };

    display()
    {
         // update terrain appearance
        this.currTerrainAppearance = this.scene.terrainAppearancesList[this.scene.terrainAppearance];

        // update terrain appearance
        this.scene.pushMatrix();
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(this.width, this.height, 1);

        this.scene.terrainAppearances[this.currTerrainAppearance].apply();

        CGFobject.prototype.display.call(this);
        this.scene.materialDefault.apply();

        this.scene.popMatrix();
    };
};