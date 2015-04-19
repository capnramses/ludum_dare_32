// game state stored as string
var game_state = "title";

// some test geometry to draw
var quad_vao;
// timers in seconds used for working out time steps
var previous_millis;
var time_step_accum_s = 0.0;
// updates at 100Hz
var time_step_size_s = 0.01;

var font_img = "textures/abys.png"
var font_meta = "fonts/abys.meta"

//
// start context and start loading assets
//
function init () {
	init_gl ();
	
	// actual programmes to build from embedded in tags on the index.html page
	var shader_prog_srcs = [
		"map.glsl",
		"city.glsl",
		"title.glsl",
		"font.glsl"
	];
	if (!load_shaders (shader_prog_srcs)) {
		return false;
	}
	
	// test geometry creation
	var quad_pts = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
	quad_vao = vao_ext.createVertexArrayOES ();
	vao_ext.bindVertexArrayOES (quad_vao);
	var quad_vp_vbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, quad_vp_vbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (quad_pts), gl.STATIC_DRAW);
	gl.vertexAttribPointer (0, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray (0);
	
	init_cam ();
	init_text_rendering (canvas.clientWidth, canvas.clientHeight);
	load_font (font_img, font_meta);
	init_title ();
	init_map ();
	init_city_icons ();
	init_agent_icons ();
//	var sound = new Howl ({urls: ['audio/epic.ogg']}).play();
	
	init_gui ();
	
	return true;
}

//
// main drawing function
//
function draw_frame () {
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport (0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
	
	var cd_at_st = cam_dirty;
	
	switch (game_state) {
		case "title":
			draw_title ();
			break;
		case "map":
			draw_map ();
			// ignore any depth values written by map so always-on-top
			draw_city_icons ();
			draw_agent_icons ();
			draw_gui ();
			draw_texts ();
			break;
		default:
	}
	
	if (cd_at_st) {
		//cam_dirty = false;
	}
}

//
// main time-step based logic update function
//
function update (elapsed) {
	switch (game_state) {
		case "title":
		
			update_title (elapsed);
		
			break;
		case "map":
		
			update_input ();
		
			//
			// do stuff here
			//
			
			break;
		default:
	}
}

function main_loop () {
	// update timers
	var current_millis = (new Date).getTime ();
	var elapsed_millis = current_millis - previous_millis;
	previous_millis = current_millis;
	var elapsed_s = elapsed_millis / 1000.0;
	time_step_accum_s += elapsed_s;
	// drawing
	draw_frame ();
	// logic updates
	while (time_step_accum_s >= time_step_size_s) {
		update (time_step_size_s);
		time_step_accum_s -= time_step_size_s;
	}

	window.requestAnimFrame (main_loop, canvas);
}

//
// programme entry point
//
function main () {
	// start context, start loading assets
	if (!init ()) {
		return;
	}
	// animate and do logic
	previous_millis = (new Date).getTime ();
	main_loop ();
}

//
//
//
function get_string_from_URL (url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open ("GET", url, false);
	xmlhttp.send ();
	return xmlhttp.responseText;
}
