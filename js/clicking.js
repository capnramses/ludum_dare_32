var has_arthur_in_hand = false;
var has_heckler_in_hand = false;
var mouse_x_clip;
var mouse_y_clip;

function update_input () {
	//
	// get mouse position and click states
	mouse_x_clip = mouse_canvas_x / canvas.clientWidth;
	mouse_y_clip = mouse_canvas_y / canvas.clientHeight;
	mouse_x_clip = mouse_x_clip * 2.0 - 1.0;
	mouse_y_clip = 1.0 - mouse_y_clip * 2.0;
	
	// reset states
	gui_hover_arthur_green = false;
	gui_hover_arthur_red = false;
	gui_hover_heckler_green = false;
	gui_hover_heckler_red = false;
	
	// show arthur moving with mouse, disallow other interactions
	if (has_arthur_in_hand) {
		// check for closest enemy city. if within radius highlight it
		highlight_city = get_closest_city_to (mouse_x_clip, mouse_y_clip, 0.1, 0);
		
		// if clicked then add comedian to city
		if (mouse_is_down && highlight_city > -1) {
			// gfx AND logic
			has_arthur_in_hand = false;
			add_comedian_to_city (1, highlight_city);
			var sound = new Howl ({urls: ['audio/arthur.wav']}).play();
			highlight_city = -1;
			// TODO
		}
		
	// show heckler moving with mouse, disallow other interactions
	} else if (has_heckler_in_hand) {
		highlight_city = get_closest_city_to (mouse_x_clip, mouse_y_clip, 0.1, 1);
		
		if (mouse_is_down && highlight_city > -1) {
			has_heckler_in_hand = false;
			add_heckler_to_city (1, highlight_city);
			var sound = new Howl ({urls: ['audio/heckler.wav']}).play();
			highlight_city = -1;
			// TODO
		}
	
	// nothing selected, do clicks and stuff
	} else {
		// check if clicked on thing that was being hovered over
		// if not enough points -- make BUR BUR sounds
		// else KA_CHING sounds
		var pts = 100;
	
		// check for hover over arthur or heckler in gui
		if (mouse_y_clip < -0.60 && mouse_y_clip >= -0.86) {
			// hover hire arthur
			if (mouse_x_clip > -0.55 && mouse_x_clip <= -0.45) {
				if (pts >= 100) {
					gui_hover_arthur_green = true;
					
					if (mouse_is_down) {
						has_arthur_in_hand = true;
						var sound = new Howl ({urls: ['audio/cash.wav']}).play();
						// TODO subtract points
					}
					
				} else {
					gui_hover_arthur_red = true;
				}
				
			// hover hire heckler
			} else if (mouse_x_clip > 0.29 && mouse_x_clip <= 0.41) {
				if (pts >= 100) {
					gui_hover_heckler_green = true;
					if (mouse_is_down) {
						has_heckler_in_hand = true;
						var sound = new Howl ({urls: ['audio/cash.wav']}).play();
						// TODO subtract points
					}
				} else {
					gui_hover_heckler_red = true;
				}
				
			}
			return;
		}
		
		// or in world map
		// if so colour in green or sthng
		
		// 1. if mouse is in gui area check if close to heckler or arthur
		
		// 2. if check distance to closest thingy. if < radius, colour it in
		
		// update pts gui text
		
		// 1. if was arthur --
		// remove icon from board
		// or from gui
		
		// 2. if was heckler --
		// same as above
		
		
	}
}
