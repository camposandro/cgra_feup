/**
 * MyCilinder
 * @constructor
 */

class MyCilinder extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = new Array();
	    this.indices = new Array();
	    this.normals = new Array();
	    this.texCoords = new Array();

		var angle = (2*Math.PI) / this.slices;
		
		for (var j = 0; j <= this.stacks; j++) {

			for (var i = 0; i <= this.slices; i++) {

				this.vertices.push(
					Math.cos(i*angle), Math.sin(i*angle), j / this.stacks
				);

				this.normals.push(
					Math.cos(i*angle), Math.sin(i*angle), 0
				);

				this.texCoords.push(
					i * 1 / this.slices, j * 1 / this.stacks
				);
			}
		}
		
		for (var j = 0; j < this.stacks; j++) {

			for (var i = 0; i < this.slices; i++) {
				
				this.indices.push(
					i + j * (this.slices + 1), (i + 1) + j * (this.slices + 1), (i + this.slices + 1) + j * (this.slices + 1),
					(i + 1) + j * (this.slices + 1), (i + this.slices + 2) + j * (this.slices + 1), (i + this.slices + 1) + j * (this.slices + 1)
				);
			}
		}

		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
