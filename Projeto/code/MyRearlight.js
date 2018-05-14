/**
 * MyRearlight
 * @constructor
 */

 class MyRearlight extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

 
        this.rearlight = new MyUnitCubeQuad(scene);

        this.rearlightAppearance = new CGFappearance(scene);
        this.rearlightAppearance.loadTexture("../resources/images/rearlight.png");

    };
     
    display()
    {
        this.scene.pushMatrix();
        
        
        //this.scene.scale(1/2, 1/2, 1/2);


        this.rearlightAppearance.apply();
        this.rearlight.display();
    
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };

 };