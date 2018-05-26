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

        this.liftingSpot = new Plane(scene, 1, 0, 1, 0, 1);
        this.liftingRange = new Array(-9, -7, -2, 0);

        this.depositSpot = new Plane(scene, 1, 0, 1, 0, 1);
        this.depositRange = new Array(10, 14, -3, 3);

        this.attachedVehicle = null;

        this.initialPos = new Array(3, 4, 0);   // crane fixed position 
        this.angle = 0;                         // crane angle
        this.armAngle = 0;                      // crane arm angle
        this.doneRot= false;                    // movement control variable 
        this.doneRotRev = true;                 // another movement control variable
        this.pickingCar = false;                // lifting car control variable
        this.hasCar = false;                    // has car control variable
    };
    
    display()
    {
        // update terrain appearance
        this.currCraneAppearance = this.scene.appearancesList[this.scene.craneAppearance];
        
        this.scene.appearances[this.currCraneAppearance].apply();

        // push do translate da grua
        this.scene.pushMatrix();

        // translating crane to its fixed position
        this.scene.translate(this.initialPos[0], this.initialPos[1], this.initialPos[2]);

        // push do rotate da grua
        this.scene.pushMatrix();

        this.scene.rotate(this.angle * Math.PI / 180, 0, 1, 0);
      
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
        
         //middle cilinder
        this.scene.pushMatrix();   
            this.scene.translate(5.6,8.5,-0.5);           
            this.cilinder.display();
        this.scene.popMatrix();

        //middle cilinder covers
        this.scene.pushMatrix();
            this.scene.translate(5.6,8.5,0.5); 
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(5.6,8.5,-0.5); 
            this.scene.rotate(Math.PI, 0,1,0);
            this.circle.display();
        this.scene.popMatrix();

        // push do rotate do braço
        this.scene.pushMatrix();

        this.scene.translate(6, 9, 0);
        this.scene.rotate(this.armAngle * Math.PI / 180, 0, 0, 1);
        this.scene.translate(-6, -9, 0);
        
        //top arm
        this.scene.pushMatrix();
            this.scene.translate(9,9,0);
            this.scene.rotate(Math.PI/2,0,0,1);
            this.scene.scale(0.7,6,1);      
            this.body1.display();
        this.scene.popMatrix();
        
        // push do rotate da corda + iman
        this.scene.pushMatrix();
        
        var d = 6, d2 = 10, alpha = Math.PI / 6;
        var transX = d*Math.sin(alpha)+d2*Math.cos(alpha);
        var transY = -d*Math.cos(alpha)+d2*Math.sin(alpha);

        this.scene.translate(transX - 0.5, transY + 8 , 0);
        this.scene.rotate(-this.armAngle * Math.PI / 180, 0, 0, 1);
        this.scene.translate(-transX + 0.5, -transY - 8 , 0);
 
        //rope                 
        this.scene.pushMatrix();   
            this.scene.translate(11.8,9,0);      
            this.scene.rotate(Math.PI/2, 1,0,0);
            this.scene.scale(0.05,0.05,4);             
            this.cilinder.display();
        this.scene.popMatrix();

        //iman
        this.scene.pushMatrix();   
            this.scene.translate(11.8,5,0);  
            this.scene.rotate(Math.PI/2, 1,0,0);         
            this.scene.scale(1.2,1.2,0.5);
            this.cilinder.display();
        this.scene.popMatrix();

        //iman covers
        this.scene.pushMatrix();
            this.scene.translate(11.8,5,0);  
            this.scene.rotate(-Math.PI/2, 1,0,0);         
            this.scene.scale(1.2,1.2,0.5);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(11.8,4.5,0);  
            this.scene.rotate(Math.PI/2, 1,0,0);         
            this.scene.scale(1.2,1.2,0.5);
            this.circle.display();
        this.scene.popMatrix();

        // pop do rotate do iman + corda
        this.scene.popMatrix();

        // pop do rotate do braço
        this.scene.popMatrix();

        // pop do rotate da grua
        this.scene.popMatrix();

         if (!this.doneRotRev) {
            this.scene.pushMatrix();
               this.scene.rotate(this.angle * Math.PI / 180 - Math.PI, 0, 1, 0);
               this.scene.translate(0,-1,0);
               this.attachedVehicle.display();
            this.scene.popMatrix();
        }

        // liftingSpot
        this.scene.pushMatrix();
            this.scene.translate(-12,-3.9,0);
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.scale(5,8,1);  
            this.scene.blackAppearance.apply();
            this.depositSpot.display();
        this.scene.popMatrix();

        // depositSpot
        this.scene.pushMatrix();
            this.scene.translate(12,-3.9,0);
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.scale(7,10,1);
            this.scene.blackAppearance.apply();
            this.liftingSpot.display();
        this.scene.popMatrix();

        // pop do translate da grua
        this.scene.popMatrix();
    };

    inLiftingSpot() {
        var carPosX = Math.round(this.scene.vehicle.pos[0]);
        var carPosZ = Math.round(this.scene.vehicle.pos[2]);
        
        if (carPosX >= this.liftingRange[0] &&
            carPosX <= this.liftingRange[1] &&
            carPosZ >= this.liftingRange[2] &&
            carPosZ <= this.liftingRange[3])
            return true;

        return false;
    }

    update(interval)
    {
        var time = interval / 1000;
        
        if (this.inLiftingSpot() && this.scene.vehicle.vel == 0) {

            if (!this.doneRot) {
                // rotating crane to the pickup spot
                var angRot = 180 * time;
                if (this.angle + angRot < 180) {
                    this.angle += angRot;
                    console.log("Moving to pickup spot!");
                } else {
                    this.angle += 180 - this.angle;
                    this.pickingCar = true;
                    this.doneRot = true;
                }

            } else if (this.hasCar) {
        
                    var angRot = 180 * time;
                    if (this.angle + angRot < 360) {
                        this.angle += angRot;
                    } else {
                        this.angle += 360 - this.angle;

                        var angRot3 = 45 * time;
                        if (this.armAngle + angRot3 < 0) {
                            this.armAngle += angRot3;
                        } else {
                            this.armAngle += -angRot3;

                            this.attachedVehicle.pos[0] += 22;
                            this.attachedVehicle.pos[2] += 3;
                            this.attachedVehicle.ang += 180;
                            this.doneRotRev = true;
                            this.hasCar = false;
                        }
                    }

            } else if (this.pickingCar) {
                     // rotates arm & iman
                     var angRot2 = -45 * time;
                      if (this.armAngle + angRot2 > -45) {
                        this.armAngle += angRot2;
                        console.log("Moving arm to pick up car!");
                    } else {
                        this.armAngle += -45 - this.armAngle;
                        this.hasCar = true;
                        this.pickingCar = false;
                        this.doneRotRev = false;
                        this.attachedVehicle = this.scene.vehicle;
                    }
                }
            }



    };

 };