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

        this.axis = new CGFaxis(this);

        // Scene elements
        this.sky = new MySky(this, 50, 20);
        this.terrain = new MyTerrain(this, 50, 50);
        this.vehicle = new MyVehicle(this);

        // Materials
        this.materialDefault = new CGFappearance(this);

        // Textures & appearances
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.loadTexture("../resources/images/floor.png");
        this.terrainAppearance.setTextureWrap('REPEAT','REPEAT');

        this.skyAppearance = new CGFappearance(this);
        this.skyAppearance.setAmbient(52.9 / 100, 80.8 / 100, 92.2 / 100, 1);
    };

    initCameras() {
        this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
    };

    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(25, 25, 25, 1.0);
        this.lights[0].setVisible(true);
        this.lights[0].setAmbient(1, 0.8, 0.8, 0.8);
        this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);

        this.lights[0].enable();


        this.lights[1].setPosition(25, 50, 50, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].setAmbient(1, 0.8, 0.8, 0.8);
        this.lights[1].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);

        this.lights[1].enable();


        this.lights[2].setPosition(50, 50, 0, 1.0);
        this.lights[2].setVisible(true);
        this.lights[2].setAmbient(1, 0.8, 0.8, 0.8);
        this.lights[2].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);

        this.lights[2].enable();
    };

    updateLights() {
        for (var i = 0; i < this.lights.length; i++)
            this.lights[i].update();
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
        this.axis.display();

        // ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section
        
        // Terrain
        this.terrain.display();

        // Sky
        this.sky.display();

        // Vehicle

        
       // this.scale(0.9, 0.9, 0.9);
        this.vehicle.display();

     
        // ---- END Scene drawing section
    };

    update(currentTime)
    {
        if (this.oldTime == 0) 
            this.oldTime = currentTime;
        else {
            var interval = currentTime - this.oldTime;
            this.oldTime = currentTime;
            //this.clock.update(interval);
        }
    };
};