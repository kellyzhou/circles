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
function getRandomNumber(start, end){
	return Math.floor((Math.random() * (end - start)) + start);
}

// **** Return a random RGBA color string
// **** Parameters: chosen opacity
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

function fillCanvasRandom(){

}

// **** Get (x,y) coordinates for radius of each circle
// **** Parameters: string
function regexCoordinates(text){
	// Match numbers
	var regex = /([0-9])+/g;
	// var text = text; // need to check parameters?
	var match = regex.exec(text);

	// Returns array of numbers. match[0] and match[1] are (x,y) coordinates
	return match;
}

// console.log(regexCoordinates('circle.200.304'));

$(document).ready(function(){
});

$(window).on('load', function(){
	fillCanvas(40);

	$('#reset').on('click', function(){
		refreshArt(40);
	});

	$('#clear').on('click', function(){
		clearArt();
	});
});

$(window).on('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	refreshArt(40);
});

// var controlForm = document.getElementById('go');
// go.onclick = getNewRadius;

$('.controls').on('click', '#go', function(){
	var newRadius = document.getElementById('controls__circle-size').value.length !== 0 ? document.getElementById('controls__circle-size').value : 40;
	newRadius = parseInt(newRadius); // convert from string

	refreshArt(newRadius);
});

function getNewRadius(){
	var newRadius = document.getElementById('controls__circle-size').value.length !== 0 ? document.getElementById('controls__circle-size').value : 40;
	// alert(newRadius);
	// console.log(canvas.width + ' ' + canvas.height);
	return newRadius;
}

// **** Click on a circle to refresh all circles
// Currently only works in FF or Chrome with experimental feature enabled
canvas.addEventListener('click', function(event) {
  if(event.region) {
    refreshArt(40);
  }
});

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

function randomMove(x, y, radius){
	// context.beginPath();
	// context.clearRect();
}
