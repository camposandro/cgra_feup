/**
 * MyCrane
 * @constructor
 */

 class MyCrane extends CGFobject {
   
    constructor(scene)
    {
        super(scene);

 
        this.cilinder = new MyCilinder(scene, 50, 5);
        this.circle = new MyCircle(scene, 50);
        this.body1 = new MyUnitCubeQuad(scene);
        this.body2 = new MyUnitCubeQuad(scene);
        this.bodymiddle = new MyCilinder(scene, 1, 1);
       

    };
     
    display()
    {
        //bottom cilinder
        this.scene.pushMatrix();               
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.cilinder.display();
        this.scene.popMatrix();

        //bottom cilinder cover
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.rotate(Math.PI, 1,0,0);
        this.circle.display();
        this.scene.popMatrix();
    
        //bottom arm
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.scale(1,10,1);
        this.scene.translate(0,0.5,0);       
        this.body1.display();
        this.scene.popMatrix();
        
        //top arm
        this.scene.pushMatrix();
        this.scene.translate(9,9,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(1,6,1);      
        this.body1.display();
        this.scene.popMatrix();
        
        //middle cilinder
        this.scene.pushMatrix();   
        this.scene.translate(5.2,9,-0.5);           
        this.cilinder.display();
        this.scene.popMatrix();

        //middle cilinder covers
        this.scene.pushMatrix();
        this.scene.translate(5.2,9,0.5); 
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.2,9,-0.5); 
        this.scene.rotate(Math.PI, 0,1,0);
        this.circle.display();
        this.scene.popMatrix();
        
        //rope                 
        this.scene.pushMatrix();   
        this.scene.translate(11.8,8.5,0);      
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.05,0.05,4);             
        this.cilinder.display();
        this.scene.popMatrix();

        //iman
        this.scene.pushMatrix();   
        this.scene.translate(11.8,4.5,0);  
        this.scene.rotate(Math.PI/2, 1,0,0);         
        this.scene.scale(1.2,1.2,0.5);
        this.cilinder.display();
        this.scene.popMatrix();

        //iman covers
        this.scene.pushMatrix();
        this.scene.translate(11.8,4.5,0);  
        this.scene.rotate(-Math.PI/2, 1,0,0);         
        this.scene.scale(1.2,1.2,0.5);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(11.8,4,0);  
        this.scene.rotate(Math.PI/2, 1,0,0);         
        this.scene.scale(1.2,1.2,0.5);
        this.circle.display();
        this.scene.popMatrix();

    };

 };