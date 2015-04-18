//

var map_image = "textures/map.png"
// map vertex array object
var map_vao;
// map texture
var map_tex;

function init_map () {
	map_tex = create_texture_from_file (map_image);
	
}

//
// param shd probably be current world pos of centre of view?
//
function draw_map () {
	gl.useProgram (shader_progs[0]);
	vao_ext.bindVertexArrayOES (quad_vao);
	gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);
}
