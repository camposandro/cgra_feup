/**
 * MyWheel
 * @constructor
 */

 class MyWheel extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

        this.wheel = new MyCilinder(scene, 30, 1);
        this.wheelRim = new MyCircle(scene, 30);

        this.wheelAppearance = new CGFappearance(scene);
        this.wheelAppearance.loadTexture("../resources/images/wheel.png");

        this.rimAppearance = new CGFappearance(scene);
        this.rimAppearance.loadTexture("../resources/images/rim.png");
    };
    
    setAngle(angle)
    {
        if (Math.abs(angle) < 60)
            this.scene.rotate(angle * Math.PI / 180, 0, 1, 0);
        else {
            if (angle < 0)
                this.scene.rotate(-60 * Math.PI / 180, 0, 1, 0);
            else if (angle > 0)
                this.scene.rotate(60 * Math.PI / 180, 0, 1, 0);
        }
    }

    display()
    {
        this.scene.pushMatrix();
        
        // diametro de roda = 1 un.
        this.scene.scale(1/2, 1/2, 1/2);

        this.wheelAppearance.apply();
        this.wheel.display();
          
        this.scene.translate(0, 0, 1);
        this.rimAppearance.apply();
        this.wheelRim.display();

        this.scene.materialDefault.apply();
        this.scene.popMatrix();
    };
 };