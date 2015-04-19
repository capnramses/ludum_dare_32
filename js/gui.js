var player_score = 0;

// special camera to look at 3d models to hire
var gui_V;
var gui_P;
var gui_PV;
var gui_arthur_PV;
var gui_heckler_PV;

var gui_hover_arthur_green = false;
var gui_hover_arthur_red = false;
var gui_hover_heckler_green = false;
var gui_hover_heckler_red = false;

function init_gui () {
	var font_px = 40.0;
	var font_voffset = font_px / canvas.clientHeight;
	add_text ("POINTS: " + player_score, -0.9, -0.5, font_px,
		1.0, 1.0, 1.0, 1.0);
	add_text ("HIRE COMEDIAN:\n    (100pts)", -0.9, -0.7, font_px, 1.0, 1.0, 1.0, 1.0);
	add_text ("HIRE HECKLER:\n    (100pts)", 0.0, -0.7, font_px, 1.0, 1.0, 1.0, 1.0);
	
	gui_V = look_at ([0.0, 0.5, 5.0], [0.0, 0.5, 0.0], [0.0, 1.0, 0.0]);
	var aspect = canvas.clientWidth / canvas.clientHeight;
	gui_P = perspective (60.0, aspect, 0.1, 100.0);
	gui_PV = mult_mat4_mat4 (gui_P, gui_V);
	gui_arthur_PV = translate_mat4 (gui_PV, [-0.5, -0.7, 0.0]);
	gui_heckler_PV = translate_mat4 (gui_PV, [0.35, -0.7, 0.0]);
}

function draw_gui () {
	gl.useProgram (shader_progs[1]);
	
	if (has_arthur_in_hand) {
		var mouse_PV = translate_mat4 (gui_PV, [mouse_x_clip, mouse_y_clip - 0.1, 0.0]);
		gl.uniformMatrix4fv (agent_PV_loc, gl.FALSE,
			new Float32Array (mouse_PV));
	} else {
		gl.uniformMatrix4fv (agent_PV_loc, gl.FALSE,
			new Float32Array (gui_arthur_PV));
	}
	
	cam_dirty = true;
	
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, arthur_icon_tex);
	gl.activeTexture (gl.TEXTURE1);
	gl.bindTexture (gl.TEXTURE_2D, arthur_icon_palette_tex);

	if (gui_hover_arthur_green) {
		gl.uniform3f (agent_highlight_loc, 0.0, 1.0, 0.0);
	} else if (gui_hover_arthur_red) {
		gl.uniform3f (agent_highlight_loc, 1.0, 0.0, 0.0);
	} else {
		gl.uniform3f (agent_highlight_loc, 0.0, 0.0, 0.0);
	}

	gl.uniformMatrix4fv (agent_M_loc, gl.FALSE,
		new Float32Array (identity_mat4 ()));
	gl.uniform3f (agent_team_col_loc, 0.0, 0.0, 1.0);
	vao_ext.bindVertexArrayOES (arthur_vao);
	gl.drawArrays (gl.TRIANGLES, 0, arthur_pc);
	
	if (has_heckler_in_hand) {
		var mouse_PV = translate_mat4 (gui_PV, [mouse_x_clip, mouse_y_clip - 0.1, 0.0]);
		gl.uniformMatrix4fv (agent_PV_loc, gl.FALSE,
			new Float32Array (mouse_PV));
	} else {
		gl.uniformMatrix4fv (agent_PV_loc, gl.FALSE,
			new Float32Array (gui_heckler_PV));
	}
	cam_dirty = true;
	
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, heckler_icon_tex);
	gl.activeTexture (gl.TEXTURE1);
	gl.bindTexture (gl.TEXTURE_2D, heckler_icon_palette_tex);
	
	if (gui_hover_heckler_green) {
		gl.uniform3f (agent_highlight_loc, 0.0, 1.0, 0.0);
	} else if (gui_hover_heckler_red) {
		gl.uniform3f (agent_highlight_loc, 1.0, 0.0, 0.0);
	} else {
		gl.uniform3f (agent_highlight_loc, 0.0, 0.0, 0.0);
	}

	gl.uniformMatrix4fv (agent_M_loc, gl.FALSE,
		new Float32Array (identity_mat4 ()));
	gl.uniform3f (agent_team_col_loc, 0.0, 0.0, 1.0);
	vao_ext.bindVertexArrayOES (heckler_vao);
	gl.drawArrays (gl.TRIANGLES, 0, heckler_pc);
	
}
