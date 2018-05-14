/**
 * MyGrill
 * @constructor
 */

 class MyGrill extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

 
        this.grill = new MyUnitCubeQuad(scene);

        this.grillAppearance = new CGFappearance(scene);
        this.grillAppearance.loadTexture("../resources/images/grill.png");

    };
     
    display()
    {
        this.scene.pushMatrix();
        
        
        //this.scene.scale(1/2, 1/2, 1/2);


        this.grillAppearance.apply();
        this.grill.display();
    
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };

 };