var player_score = 0;

// special camera to look at 3d models to hire
var gui_V;
var gui_PV;

function init_gui () {
	var font_px = 40.0;
	var font_voffset = font_px / canvas.clientHeight;
	add_text ("POINTS: " + player_score, -0.9, -0.5, font_px,
		1.0, 1.0, 1.0, 1.0);
	add_text ("HIRE COMEDIAN:\n    (100pts)", -0.9, -0.7, font_px, 1.0, 1.0, 1.0, 1.0);
	add_text ("HIRE HECKLER:", 0.0, -0.7, font_px, 1.0, 1.0, 1.0, 1.0);
	
	gui_V = look_at ([0.0, 0.5, 5.0], [0.0, 0.5, 0.0], [0.0, 1.0, 0.0]);
	gui_PV = mult_mat4_mat4 (P, gui_V);
	gui_PV = translate_mat4 (gui_PV, [-0.5, -0.7, 0.0]);
}

function draw_gui () {
	gl.useProgram (shader_progs[1]);
	gl.uniformMatrix4fv (agent_PV_loc, gl.FALSE, new Float32Array (gui_PV));
	cam_dirty = true;
	
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, arthur_icon_tex);
	gl.activeTexture (gl.TEXTURE1);
	gl.bindTexture (gl.TEXTURE_2D, arthur_icon_palette_tex);

	gl.uniformMatrix4fv (agent_M_loc, gl.FALSE,
		new Float32Array (identity_mat4 ()));
	gl.uniform3f (agent_team_col_loc, 0.0, 0.0, 1.0);
	vao_ext.bindVertexArrayOES (arthur_vao);
	gl.drawArrays (gl.TRIANGLES, 0, arthur_pc);
}
