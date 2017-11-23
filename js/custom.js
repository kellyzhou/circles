var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var context = canvas.getContext('2d');
}

function drawCircle(x, y, radius){
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, true);
	context.fillStyle = 'blue';
	context.fill();
	context.closePath();
}

for (var i=0; i<1; i++){
	drawCircle(100, 100, 50);
}
// context.fillRect(0, 0, 300, 150);
