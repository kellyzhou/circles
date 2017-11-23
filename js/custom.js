var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var context = canvas.getContext('2d');
}

// context.fillRect(0, 0, 300, 150);
context.beginPath();
context.arc(100, 100, 75, 0, Math.PI * 2, true);
context.fillStyle = 'blue';
context.fill();