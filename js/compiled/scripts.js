var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas.getContext) {
	var context = canvas.getContext('2d');
	context.save();
}

// **** Draw a circle on canvas with an (experimental) HitRegion ID
// **** Parameters: (x,y) coordinates of the circle's center. radius of circle, color
function drawCircle(x, y, radius, color){
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, true);
	context.fillStyle = color;
	context.fill();
	context.closePath();
	context.addHitRegion({id: x+'.'+y});
}

// **** To get random RGB values
// **** Parameters: start and end values of the range of numbers
// **** Returns int
function getRandomNumber(start, end){
	return Math.floor((Math.random() * (end - start)) + start);
}

// **** Return a random RGBA color string
// **** Parameters: chosen opacity
// **** Returns string
function pickColor(opacity){
	var red = getRandomNumber(0, 255);
	var green = getRandomNumber(0, 255);
	var blue = getRandomNumber(0, 255);
	var rgbaValue = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')'; // Concatenate values
	return rgbaValue;
}


// trig formula
	// drawCircle(50 + 100/(Math.sqrt(2)), 50 + 100/(Math.sqrt(2)), 50, pickColor(0.4));

// **** Fill canvas with straight rows of circles
// **** Parameters: size of radius for the circles
function fillCanvas(radius){
	var width = window.innerWidth;
	var height = window.innerHeight;

	var circleRadius = radius;

	// Round down (floor) to the number of circles that can fit in a row and to the number of rows that can fit in the browser window. Round up (ceil) to get circles to completely fill the browser space (even if some are cut off)
	var numberCirclesPerRow = Math.ceil(width / (circleRadius*2));
	var numberRows = Math.ceil(height / (circleRadius*2));

	for (var r = 1; r <= numberRows; r++){
		for (var c = 1; c <= numberCirclesPerRow; c++) {
			// Calculate the total diameters of the circles that came before your circle in the row and add a single circleRadius = x value
			// Calculate the total diameters of the circles that came before your circle in the column (height) and add a single circleRadius = y value
			// Opacity is set in pickColor
			drawCircle( (circleRadius * 2 * (c-1)) + circleRadius, (circleRadius * 2 * (r-1)) + circleRadius, circleRadius, pickColor(0.3));
		}
	}
}

// **** Clear circles
function clearArt(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

// **** Reset circles
function refreshArt(radius){
	// Clear existing canvas (entire window)
	clearArt();
	fillCanvas(radius);
}

// **** Get (x,y) coordinates for radius of each circle
// **** Parameters: string (haystack to be processed)
// **** Returns array
function regexCoordinates(text){
	// Match numbers
	var regex = /([0-9])+/g;

	// Make sure it's a string and return all matches (vs exec)
	var matches = String(text).match(regex);

	// Returns array of numbers. match[0] and match[1] are (x,y) coordinates
	return matches;
}

// **** Get the user-inputted radius from a field
// **** Parameters: ID of the field that will intake user input
// **** Returns int
function getNewRadius(inputValueID){
	// If the radius input field is not empty, use the value. Otherwise, default to radius = 30
	var newRadius = document.getElementById(inputValueID).value.length !== 0 ? document.getElementById(inputValueID).value : 30;

	// Convert from string
	newRadius = parseInt(newRadius);
	return newRadius;
}

// **** Draw a circle at a random position (will occur on click)
// **** Parameters: radius of new circle, opacity of new circle
function randomMove(radius, opacity){
	// Assuming the entire circle is within the limits of the canvas (browser window), the radius must be at least a radius-length within the canvas
	var maxWidth = canvas.width - parseInt(radius);
	var maxHeight = canvas.height - parseInt(radius);
	var minWidth = 0 + parseInt(radius);
	var minHeight = 0 + parseInt(radius);

	// Generate random (x,y) coordinates
	var newX = Math.floor((Math.random() * (maxWidth - minWidth)) + minWidth);
	var newY = Math.floor((Math.random() * (maxHeight - minHeight)) + minHeight);

	drawCircle(newX, newY, radius, pickColor(opacity));
	context.addHitRegion({id:'newCircle'}); // Distinguish new circles from original ones
}


$(document).ready(function(){
	var container = document.getElementById('dialog-container');
	var dialog = document.getElementById('dialog');
	window.onclick = function(event){
		if ( event.target == container ) {
			container.style.display = 'none';
		}
	};
});

$(window).on('load', function(){
	fillCanvas(30);

	$('#reset').on('click', function(){
		var setRadius = document.getElementById('controls__circle-size');
		setRadius.value = '';
		refreshArt(30);
	});

	$('#clear').on('click', function(){
		clearArt();
	});
});

$(window).on('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Reset using user input
	var newValue = getNewRadius('controls__circle-size');
	refreshArt(newValue);
});

$('.controls').on('click', '#go', function(){
	var newValue = getNewRadius('controls__circle-size');
	refreshArt(newValue);

});

$('#controls__circle-size').keydown(function(event){
	var x = event.keyCode; // Enter key has a keycode of 13
	if ( x == 13 ) {
		var newValue = getNewRadius('controls__circle-size');
		refreshArt(newValue);
	}
});

// **** Click on a circle to refresh all circles
// Currently only works in FF or Chrome with experimental feature enabled
canvas.addEventListener('click', function(event) {
  if(event.region) {
  	var coordinates = [];
  	coordinates = regexCoordinates(event.region);

  	var newValue = getNewRadius('controls__circle-size'); // defaults to 30

  	// Get the left/top most coordinates of the square encapsulating the clicked circle (region ID coordinates minus radius)
  	var xStart = coordinates[0] - newValue;
  	var yStart = coordinates[1] - newValue;

  	// Don't erase new circles (originals have already been cleared and moved), only erase original circles
  	if ( event.region !== 'newCircle' ) {
	  	// newValue is radius, * 2 for diameter
	  	context.clearRect(xStart, yStart, newValue * 2, newValue * 2); // (x, y, width, height)
  	}

  	randomMove(newValue, 1);
  }
});
