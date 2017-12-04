var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas.getContext) {
	var context = canvas.getContext('2d');
}

function drawCircle(x, y, radius, color){
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, true);
	context.fillStyle = color;
	context.fill();
	context.closePath();
	context.addHitRegion({id: x+'.'+y});
}

	// drawCircle(50, 50, 50, "rgba(24,200,30,1.0)");
	// drawCircle(150, 50, 50, 'blue');


// To get random RGB values
// Parameters: start and end values of the range of numbers
function getRandomNumber(start, end){
	return Math.floor((Math.random() * (end - start)) + start);
}

// Return a random RGBA color string
// Parameters: chosen opacity
function pickColor(opacity){
	var red = getRandomNumber(0, 255);
	var green = getRandomNumber(0, 255);
	var blue = getRandomNumber(0, 255);
	var rgbaValue = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')'; // Concatenate values
	return rgbaValue;
}

// console.log(Math.random() * 255);
// console.log(getRandomNumber(0,255));
// console.log(pickColor(0.5));

// trig formula
	// drawCircle(50 + 100/(Math.sqrt(2)), 50 + 100/(Math.sqrt(2)), 50, pickColor(0.4));

// context.fillRect(0, 0, 300, 150);


// Fill canvas with straight rows of circles
// Parameters: size of radius for the circles
function fillCanvas(radius){
	var width = window.innerWidth;
	var height = window.innerHeight;

	var circleRadius = radius;

	// Round down to the number of circles that can fit in a row and to the number of rows that can fit in the browser window
	var numberCirclesPerRow = Math.floor(width / circleRadius);
	var numberRows = Math.floor(height / circleRadius);

	for (var r = 1; r <= numberRows; r++){
		for (var c = 1; c <= numberCirclesPerRow; c++) {
			// Calculate the total diameters of the circles that came before your circle in the row and add a single circleRadius = x value
			// Calculate the total diameters of the circles that came before your circle in the column (height) and add a single circleRadius = y value
			drawCircle( (circleRadius * 2 * (c-1)) + circleRadius, (circleRadius * 2 * (r-1)) + circleRadius, circleRadius, pickColor(0.35));
		}
	}
}


// circleRadius * 2 * (c-1) + circleRadius
// =2c(circleRadius) - 2circleradius + circleRadius
// =2c(circleRadius) - circleRadius

// circleRadius * c + (c-1) * circleRadius
// = circleRadius * c + c(circleRadius) - circleRadius
// = 2c(circleRadius) - circleRadius

fillCanvas(40);

function fillCanvasRandom(){

}

function regexCoordinates(text){
	var regex = /([0-9])+/g;
	// var text = text; // need to check parameters?
	var match = regex.exec(text);

	// Returns array of (x,y) coordinates
	return match;
}

// var regex = /([0-9])+/g;
// var text = 'circle.200.30';
// var match = regex.exec(text);
// console.log(match);

console.log(regexCoordinates('circle.200.304'));

canvas.addEventListener('click', function(event) {
  if(event.region) {
    alert(event.region);
    refreshArt(40);
  }
});


// Reset circles
function refreshArt(radius){
	// Clear existing canvas (entire window)
	context.clearRect(0, 0, canvas.width, canvas.height);
	fillCanvas(radius);
}
