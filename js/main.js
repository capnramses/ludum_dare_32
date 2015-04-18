// game state stored as string
var game_state = "title";

// some test geometry to draw
var quad_vao;
// timers in seconds used for working out time steps
var prev_time_s;
var time_step_accum_s = 0.0;
// updates at 100Hz
var time_step_size_s = 0.01;

//
// start context and start loading assets
//
function init () {
	init_gl ();
	
	// actual programmes to build from embedded in tags on the index.html page
	var shader_prog_srcs = [
		"map.glsl"
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
	
	init_title ();
	init_map ();
	
	return true;
}

//
// main drawing function
//
function draw_frame () {
	gl.clear (gl.COLOR_BUFFER_BIT);
	gl.viewport (0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
	
	switch (game_state) {
		case "title":
			draw_title ();
			break;
		case "map":
			draw_map ();
			break;
		default:
	}
}

//
// main time-step based logic update function
//
function update () {
	switch (game_state) {
		case "title":
		
			// do stuff
		
			break;
		case "map":
		
			// do stuff
		
			break;
		default:
	}
}

function main_loop () {
	// update timers
	var curr_time_s = (new Date).getTime () / 1000.0;
	var elapsed_s = curr_time_s - prev_time_s;
	prev_time_s = curr_time_s;
	time_step_accum_s += elapsed_s;
	
	// drawing
	draw_frame ();
	
	// logic updates
	while (time_step_accum_s >= time_step_size_s) {
		time_step_accum_s -= time_step_size_s;
		
		//
		// call updates here, with elapsed time of "time_step_size_s"
		//
		
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
	prev_time = (new Date).getTime () / 1000.0;
	main_loop ();
}
