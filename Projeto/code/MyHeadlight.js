/**
 * MyHeadlight
 * @constructor
 */

 class MyHeadlight extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

 
        this.headlight = new MyCircle(scene, 30);

        this.headlightAppearance = new CGFappearance(scene);
        this.headlightAppearance.loadTexture("../resources/images/headlights.png");

    };
     
    display()
    {
        this.scene.pushMatrix();
        
        
        this.scene.scale(1/2, 1/2, 1/2);


        this.headlightAppearance.apply();
        this.headlight.display();
    
        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };

 };