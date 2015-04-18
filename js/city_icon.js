// city image file
var city_icon_image = "textures/city.png";
// city mesh file
var city_mesh = "meshes/city.obj";
// city texture
var city_icon_tex;
// VAO for mesh
var city_vao;
// # of vertex points in mesh
var city_pc;
// actual instances of city mesh things on the map
var city_icons = [];
var city_PV_loc;
var city_M_loc;

function add_city_icon (name_str, world_x, world_z) {
	var font_px = 40.0;

	var icon = new Object;
	icon.name_str = name_str;
	icon.x = world_x;
	icon.y = 0.0;
	icon.z = world_z;
	icon.M = translate_mat4 (identity_mat4 (), [icon.x, icon.y, icon.z]);
	city_icons.push (icon);

	// convert city world coords to screen coords
	var screen_pos = mult_mat4_vec4 (V, [world_x, 0.0, world_z, 1.0]);
	screen_pos = mult_mat4_vec4 (P, screen_pos);
	// perspective division
	screen_pos[0] /= screen_pos[3];
	screen_pos[1] /= screen_pos[3];
	screen_pos[2] /= screen_pos[3];
	add_text (name_str, screen_pos[0], screen_pos[1], font_px, 0.0, 1.0, 0.0, 1.0);
}

function init_city_icons () {
	// texture
	city_icon_tex = create_texture_from_file (city_icon_image);
	// mesh
	city_vao = vao_ext.createVertexArrayOES ();
	vao_ext.bindVertexArrayOES (city_vao);
	parse_obj_into_vbos (city_mesh);
	city_pc = pc;
	gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vp);
	gl.vertexAttribPointer (gl.getAttribLocation (shader_progs[1], "vp"), 3,
		gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray (0);
	gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vt);
	gl.vertexAttribPointer (gl.getAttribLocation (shader_progs[1], "vt"), 2,
		gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray (1);
	gl.bindBuffer (gl.ARRAY_BUFFER, vbo_vn);
	gl.vertexAttribPointer (gl.getAttribLocation (shader_progs[1], "vn"), 3,
		gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray (2);

	// dummy instances
	add_city_icon ("Cape Town", 0.0, 3.0);
	add_city_icon ("Singapore", 10.0, 0.0);
	add_city_icon ("Seattle", -15.0, -5.0);
	
	city_PV_loc = get_uniform_loc (shader_progs[1], "PV");
	city_M_loc = get_uniform_loc (shader_progs[1], "M");
	
	gl.useProgram (shader_progs[1]);
	gl.uniformMatrix4fv (city_PV_loc, gl.FALSE, new Float32Array (PV));
}

function draw_city_icons () {
	gl.useProgram (shader_progs[1]);
	if (cam_dirty) {
		gl.uniformMatrix4fv (city_PV_loc, gl.FALSE, new Float32Array (PV));
	}
	
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, city_icon_tex);

	var n = city_icons.length;
	for (var i = 0; i < n; i++) {
		gl.uniformMatrix4fv (city_M_loc, gl.FALSE,
			new Float32Array (city_icons[i].M));
		vao_ext.bindVertexArrayOES (city_vao);
		gl.drawArrays (gl.TRIANGLES, 0, city_pc);
	}
}
