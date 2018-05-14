var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene {

    constructor() {
        super();
    };

    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();
        this.enableTextures(true);

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.myAxis = new CGFaxis(this);

        // Scene elements
        this.sky = new MySky(this, 50, 20);
        this.terrain = new MyTerrain(this, 50, 50);
        this.vehicle = new MyVehicle(this);

        // Materials
        this.materialDefault = new CGFappearance(this);

        // Sky texture
        this.skyAppearance = new CGFappearance(this);
        this.skyAppearance.setAmbient(52.9 / 100, 80.8 / 100, 92.2 / 100, 1);

        // Terrain-related textures
        this.asphaltAppearance = new CGFappearance(this);
        this.asphaltAppearance.loadTexture("../resources/images/asphalt.png");
        this.asphaltAppearance.setTextureWrap('REPEAT','REPEAT');

        this.dirtAppearance = new CGFappearance(this);
        this.dirtAppearance.loadTexture("../resources/images/dirt.png");
        this.dirtAppearance.setTextureWrap('REPEAT','REPEAT');

        this.grassAppearance = new CGFappearance(this);
        this.grassAppearance.loadTexture("../resources/images/grass.png");
        this.grassAppearance.setTextureWrap('REPEAT','REPEAT');

        this.sandAppearance = new CGFappearance(this);
        this.sandAppearance.loadTexture("../resources/images/sand.png");
        this.sandAppearance.setTextureWrap('REPEAT','REPEAT');
    
        this.terrainAppearances = [
            this.asphaltAppearance,
            this.dirtAppearance,
            this.grassAppearance,
            this.sandAppearance
        ];
        this.terrainAppearancesList = {
            'asphalt': 0,
            'dirt': 1,
            'grass': 2,
            'sand': 3
        };
        this.terrainAppearance = 'asphalt';

        // Car-related textures        
        this.blackAppearance = new CGFappearance(this);
        this.blackAppearance.setAmbient(0, 0, 0);
        this.blackAppearance.setDiffuse(0.2, 0.2, 0.2);
        this.blackAppearance.setSpecular(0, 0, 0);

        this.blueAppearance = new CGFappearance(this);
        this.blueAppearance.setAmbient(25 / 255, 25 / 255, 112 / 255);
        this.blueAppearance.setDiffuse(0.3, 0.3, 0.3);
        this.blueAppearance.setSpecular(0.5, 0.5, 0.5);

        this.camouflageAppearance = new CGFappearance(this);
        this.camouflageAppearance.loadTexture("../resources/images/camouflage.png");

        this.vehicleAppearances = [
            null,
            this.blackAppearance,
            this.blueAppearance,
            this.camouflageAppearance
        ];
        this.vehicleAppearancesList = {
            'white': 0,
            'black': 1,
            'blue': 2,
            'camouflage': 3,
        };
        this.vehicleAppearance = 'white';

        this.light1 = true;
        this.light2 = true;
        this.axis = true;
        this.speed = 3;

        this.oldTime = 0;
        this.setUpdatePeriod(100);
    };

    initCameras() {
        this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
    };

    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(15, 25, 30, 1.0);
        this.lights[0].setVisible(true);
        this.lights[0].setAmbient(1, 0.8, 0.8, 0.8);
        this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);

        this.lights[1].setPosition(30, 25, 15, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].setAmbient(1, 0.8, 0.8, 0.8);
        this.lights[1].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);  

        this.lights[0].enable();
        this.lights[1].enable();
    };

    updateLights() {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].update();
        }
            
        if (this.light1)
            this.lights[0].enable();
        else
            this.lights[0].disable();

        if (this.light2)
            this.lights[1].enable();
        else 
            this.lights[1].disable();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Update all lights used
        this.updateLights();

        // Draw axis
        if (this.axis) this.myAxis.display();

        // ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section
        
        // Terrain
        this.terrain.display();

        // Sky
        this.sky.display();

        // Vehicle
        this.vehicle.display();
     
        // ---- END Scene drawing section
    };

    update(currentTime)
    {  
        this.checkKeys();

        if (this.oldTime == 0) 
            this.oldTime = currentTime;
        else {
            var interval = currentTime - this.oldTime;
            this.oldTime = currentTime;
            this.vehicle.update(interval);
        }        
    };

    Menu()
    {
        console.log("On menu ...\n");
    };

    checkKeys()
    {
        var movePressed = false;
        var dirPressed = false;

        if (this.gui.isKeyPressed("KeyW"))
        {
            movePressed = true;
            this.vehicle.vel += this.speed / 100;
        }

        if (this.gui.isKeyPressed("KeyA"))
        {
            dirPressed = true;
            this.vehicle.ang += this.speed * 4;
            this.vehicle.ang %= 360;
        }

        if (this.gui.isKeyPressed("KeyS"))
        {
            movePressed = true;
            this.vehicle.vel -= this.speed / 100;
        }

        if (this.gui.isKeyPressed("KeyD"))
        {
            dirPressed = true;
            this.vehicle.ang -= this.speed * 4;
            this.vehicle.ang %= 360;
        }

        if (dirPressed)
            this.vehicle.turning = true;
        else 
            this.vehicle.turning = false;
            
        if (!movePressed) {
            if (this.vehicle.vel > 0) {
                this.vehicle.vel -= this.speed / 100;
                if (this.vehicle.vel < 0) 
                    this.vehicle.vel = 0;
            }
            else if (this.vehicle.vel < 0) {
                this.vehicle.vel += this.speed / 100;
                 if (this.vehicle.vel > 0) 
                    this.vehicle.vel = 0;
            }
        }
    };
};