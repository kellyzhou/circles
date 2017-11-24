var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var context = canvas.getContext('2d');
}

function drawCircle(x, y, radius, color){
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, true);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

	drawCircle(100, 100, 50, 'pink');
	drawCircle(200, 200, 50, 'blue');

for (var i=0; i<1; i++){
	// drawCircle(100, 100, 50, 'pink');
}
// context.fillRect(0, 0, 300, 150);
