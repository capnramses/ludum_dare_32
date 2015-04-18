//

var title_image = "textures/title.png"
// map texture
var title_tex;

function init_title () {
	title_tex = create_texture_from_file (title_image);
	
}

//
// param shd probably be current world pos of centre of view?
//
function draw_title () {
	gl.useProgram (shader_progs[0]);
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, title_tex);
	vao_ext.bindVertexArrayOES (quad_vao);
	gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);
}
