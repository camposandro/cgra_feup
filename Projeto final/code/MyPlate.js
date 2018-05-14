/**
 * MyPlate
 * @constructor
 */

 class MyPlate extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

 
        this.plate = new MyUnitCubeQuad(scene);

        this.plateAppearance = new CGFappearance(scene);
        this.plateAppearance.loadTexture("../resources/images/license plate.png");

    };
     
    display()
    {
        this.scene.pushMatrix();
        
        
        //this.scene.scale(1/2, 1/2, 1/2);


        this.plateAppearance.apply();
        this.plate.display();
    
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };

 };