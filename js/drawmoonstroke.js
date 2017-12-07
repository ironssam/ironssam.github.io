function drawmoonstroke(canvas, centerX, centerY, rise, set, radius, color, width, cap) {
	canvas.strokeStyle = color;
	canvas.lineWidth = width;
	canvas.lineCap = cap;
	canvas.translate(centerY, centerX);
	canvas.beginPath();
	canvas.arc(0,0,radius*.5,rise,set);
	canvas.stroke();
	canvas.closePath();
	canvas.translate(-centerY, -centerX);
}