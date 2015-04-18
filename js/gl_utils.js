// DOM element for the canvas tag on the webpage
var canvas;
// main webgl interface object. all GL functions are variables are called from
// this e.g. gl.bindThingy() or gl.TRIANGLES
var gl;
// interface to Vertex Array Object extension
// simplifies rendering code in modern GL standard
var vao_ext;

//
// check if an extension exists in the browser
// if not, writes an error message to web element with id given
// return ext or false if ext is missing
//
function check_ext (name) {
	var ext = gl.getExtension (name);
	if (!ext) {
		pg_err ("ERROR: Your browser does not support WebGL extension: " + name);
		return false;
	}
	return ext;
}

//
// start graphics context and some useful GL extensions
//
function init_gl () {
	canvas = document.getElementById ("canvas");
	gl = canvas.getContext ("webgl");
	vao_ext = check_ext ("OES_vertex_array_object");
	gl.clearColor (0.2, 0.2, 0.2, 1.0);
	gl.cullFace (gl.BACK);
	gl.frontFace (gl.CCW);
	gl.enable (gl.CULL_FACE);
	gl.enable (gl.DEPTH_TEST);
}

/** FROM Google webgl-utils.js
 * Provides requestAnimationFrame in a cross browser way.
 * which is a reliable way to do a rendering loop via callback in javascript
 */
window.requestAnimFrame = (function() {
return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
		return window.setTimeout (callback, 1000 / 60);
	};
})();

function create_texture_from_file (url) {
	console.log ("loading image " + url + "...");
	var texture = gl.createTexture();
	var image = new Image();
	image.onload = function () {
		gl.bindTexture (gl.TEXTURE_2D, texture);
		gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
			image);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		// no anti-aliasing
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		console.log ("texture loaded from " + url);
	}
	image.src = url;
	return texture;
}

function get_uniform_loc (sp, var_str) {
	var loc = gl.getUniformLocation (sp, var_str);
	if (loc < 0) {
		console.error ("uniform variable not active: " + var_str);
	}
	return loc;
}
