class CanvasConstructor{
	constructor(){
		this.color = "#000";
		this.painting = false;
		this.started = false;
		this.width_brush = 2;
		this.canvas = $("#canvas");
		this.cursorX; this.cursorY;
		this.restoreCanvasArray = [];
		this.restoreCanvasIndex = 0;

		this.context = this.canvas[0].getContext('2d');

	// Trait arrondi :
	this.context.lineJoin = 'round';
	this.context.lineCap = 'round';
}

	// Click souris enfoncé sur le canvas, je dessine :
	mouseConstructor(){
		var self = this;
		this.canvas.mousedown(function(e) {

			this.painting = true;

		// Coordonnées de la souris :
		this.cursorX = (e.pageX - this.offsetLeft); /******************/
		this.cursorY = (e.pageY - this.offsetTop);	/******************/

	});

	// Relachement du Click sur tout le document, j'arrête de dessiner :
	this.canvas.mouseup(function() {
		this.painting = false;
		this.started = false;
	});
	
	// Mouvement de la souris sur le canvas :
	this.canvas.mousemove(function(e) {
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (this.painting) {
			// Set Coordonnées de la souris :
			this.cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
			this.cursorY = (e.pageY - this.offsetTop) - 10;	/******************/
			
			// Dessine une ligne :
			self.drawLine(this.cursorX, this.cursorY);
		}
	});
	self.reset();
}

touchConstructor(){

	var self = this;

	this.canvas[0].addEventListener('touchstart', function(e) {

		e.preventDefault(); 
		this.painting = true;

    var pageX = e.touches[0].pageX; //to get pageX value in touch devices
    var pageY = e.touches[0].pageY; //to get pageY value in touch devices  

    this.cursorX = (pageX - this.offsetLeft); 
    this.cursorY = (pageY - this.offsetTop);

}, false);

	this.canvas[0].addEventListener('touchend', function(e) {
		e.preventDefault(); 

		this.painting = false;
		this.started = false;   

	}, false);

	this.canvas[0].addEventListener('touchmove', function(e) {
		if (this.painting) {
			e.preventDefault(); 

        var pageX = e.touches[0].pageX; //to get pageX value in touch devices
        var pageY = e.touches[0].pageY; //to get pageY value in touch devices  

        this.cursorX = (pageX - this.offsetLeft) - 10; 
        this.cursorY = (pageY - this.offsetTop) - 10;

        self.drawLine(this.cursorX, this.cursorY);
    }
}, false);

	self.reset();
}

	// Fonction qui dessine une ligne :
	drawLine(cursorX, cursorY) {
		// Si c'est le début, j'initialise
		if (!this.started) {
			// Je place mon curseur pour la première fois :
			this.context.beginPath();
			this.context.moveTo(cursorX, cursorY);
			this.started = true;
		} 
		// Sinon je dessine
		else {
			this.context.lineTo(cursorX, cursorY);
			this.context.strokeStyle = this.color;
			this.context.lineWidth = this.width_brush;
			this.context.stroke();
		}
	}
	
	// Clear du Canvas :
	clear_canvas() {
		this.context.clearRect(0,0, this.canvas.width(), this.canvas.height());
		this.context.beginPath();
	}
	
	
	// Bouton Reset :
	reset(){
		var self = this;
		$("#reset").click(function() {
		// Clear canvas :
		self.clear_canvas();
		
	});
	}
}