// camera matrices
var V, P, PV;
var cam_dirty = false;

function init_cam () {
	V = look_at ([0.0, 20.0, 10.0], [0.0, 1.0, 0.0],
		normalise_vec3 ([0.0, 2.0, -1.0]));
	var aspect = canvas.clientWidth / canvas.clientHeight;
	P = perspective (67.0, aspect, 0.1, 100.0);
	PV = mult_mat4_mat4 (P, V);
	cam_dirty = true;
}
