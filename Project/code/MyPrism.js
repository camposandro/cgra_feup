/**
 * MyPrism
 * @constructor
 */

class MyPrism extends CGFobject
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

		// stacks unitárias
        var indice = 0, z = 0, step = 1 / this.stacks;

		for (var j = 0; j < this.stacks; j++) {

			var angle = (2*Math.PI) / this.slices;

			for (var i = 0; i < this.slices * 2; i++) {

				this.vertices.push(
					Math.cos(i*angle), Math.sin(i*angle), z,
					Math.cos(i*angle), Math.sin(i*angle), z + step,
					Math.cos((i+1)*angle), Math.sin((i+1)*angle),  z,
					Math.cos((i+1)*angle), Math.sin((i+1)*angle),  z + step,
				);

				this.indices.push(			
					indice, indice+2, indice+3,
					indice+3, indice+1, indice,
				);
				indice += 2;

				this.normals.push(
					Math.cos((i+1)*angle/2), Math.sin((i+1)*angle/2), 0,
					Math.cos((i+1)*angle/2), Math.sin((i+1)*angle/2), 0,
					Math.cos((i+1)*angle/2), Math.sin((i+1)*angle/2), 0,
					Math.cos((i+1)*angle/2), Math.sin((i+1)*angle/2), 0,
				);
			}

			z += step;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
