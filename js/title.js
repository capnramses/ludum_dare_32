//

var title_images = [
	"textures/title.png",
	"textures/title2.png"
];
// map texture
var title_texs = [];

var title_timer = 0.0;
var title_max_time = 4.0;
var title_anim_step = 0.5;
var title_curr_frame = 0;

function init_title () {
	title_texs[0] = create_texture_from_file (title_images[0]);
	title_texs[1] = create_texture_from_file (title_images[1]);
}

function update_title (seconds) {
	title_timer += seconds;

	title_curr_frame = Math.floor (title_timer / title_anim_step);

	// advance to map
	// perhaps fade out first in shader?
	if (title_timer > title_max_time) {
		game_state = "map";
	}
}

//
// param shd probably be current world pos of centre of view?
//
function draw_title () {
	gl.useProgram (shader_progs[0]);
	gl.activeTexture (gl.TEXTURE0);
	if (title_curr_frame % 2 == 0) {
		gl.bindTexture (gl.TEXTURE_2D, title_texs[0]);
	} else {
		gl.bindTexture (gl.TEXTURE_2D, title_texs[1]);
	}
	vao_ext.bindVertexArrayOES (quad_vao);
	gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);
}
