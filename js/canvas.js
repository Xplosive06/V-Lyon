class CanvasConstructor {
	constructor() {
		this.color = "#000";
		this.painting = false;
		this.started = false;
		this.width_brush = 2;
		this.canvas = $("#canvas");
		this.cursorX;
		this.cursorY;
		this.restoreCanvasArray = [];
		this.restoreCanvasIndex = 0;

		this.context = this.canvas[0].getContext('2d');

		// Round lines :
		this.context.lineJoin = 'round';
		this.context.lineCap = 'round';
		//Calling methods for mouse and touch
		this.mouseConstructor();
		this.touchConstructor();
	}

	// When mouse down, we start to draw :
	mouseConstructor() {
		var self = this;
		this.canvas.mousedown(function(e) {

			this.painting = true;

			// Coordinates of the mouse :
			this.cursorX = (e.pageX - this.offsetLeft);
			this.cursorY = (e.pageY - this.offsetTop);

		});

		// When the click is release, we stop drawing :
		this.canvas.mouseup(function() {
			this.painting = false;
			this.started = false;
		});

		// Mouse movements :
		this.canvas.mousemove(function(e) {
			// If clicking :
			if (this.painting) {
				// Setting of the mouse's coordinates :
				this.cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = cursor offset
				this.cursorY = (e.pageY - this.offsetTop) - 10;

				// Drawing a line :
				self.drawLine(this.cursorX, this.cursorY);
			}
		});
		// Initialising of the reset button
		self.reset();
	}
	// Mainly the same than the mouse
	touchConstructor() {

		var self = this;
		// But we have to use an "addEventListener" as we can't call touch functions on the canvas
		this.canvas[0].addEventListener('touchstart', function(e) {

			e.preventDefault();
			this.painting = true;

			var pageX = e.touches[0].pageX; //to get pageX value in touch devices
			var pageY = e.touches[0].pageY; //to get pageY value in touch devices  

			this.cursorX = (pageX - this.offsetLeft);
			this.cursorY = (pageY - this.offsetTop);

		}, {
			passive: true
		});

		this.canvas[0].addEventListener('touchend', function(e) {
			e.preventDefault();

			this.painting = false;
			this.started = false;

		}, {
			passive: true
		});

		this.canvas[0].addEventListener('touchmove', function(e) {
			if (this.painting) {
				e.preventDefault();

				var pageX = e.touches[0].pageX; //to get pageX value in touch devices
				var pageY = e.touches[0].pageY; //to get pageY value in touch devices  

				this.cursorX = (pageX - this.offsetLeft) - 10;
				this.cursorY = (pageY - this.offsetTop) - 10;

				self.drawLine(this.cursorX, this.cursorY);
			}
		}, {
			passive: true
		});

		self.reset();
	}

	// Function to draw a line :
	drawLine(cursorX, cursorY) {
		// Initialize for the very first time
		if (!this.started) {
			// Placing my cursor for the first time :
			this.context.beginPath();
			this.context.moveTo(cursorX, cursorY);
			this.started = true;
		}
		// Otherwise, we draw
		else {
			this.context.lineTo(cursorX, cursorY);
			this.context.strokeStyle = this.color;
			this.context.lineWidth = this.width_brush;
			this.context.stroke();
		}
	}

	// Clearing the canvas :
	clear_canvas() {
		this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
		this.context.beginPath(); // Needed to clear the canvas even if we draw again
	}


	// Reset button :
	reset() {
		var self = this;
		$("#reset").click(function() {
			// Clear canvas :
			self.clear_canvas();

		});
	}
}