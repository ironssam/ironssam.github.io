function drawmoonstroke(canvas, center, rise, set, radius, color, width, cap) {
	canvas.strokeStyle = color;
	canvas.lineWidth = width;
	canvas.lineCap = cap;
	canvas.translate(center, center);
	canvas.beginPath();
	canvas.arc(0,0,radius,rise,set);
	canvas.stroke();
	canvas.closePath();
	canvas.translate(-center, -center);
}