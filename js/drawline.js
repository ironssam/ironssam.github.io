function drawLine(canvas, centerX, centerY, angle, radius, width, length, cap, color) {
	canvas.lineCap = cap;
	canvas.lineWidth = width;
	canvas.strokeStyle = color;
	canvas.translate(centerY, centerX);
	var px1 = angleToX(angle,radius);
	var py1 = Math.sin(angle)*radius;
	var px2 = -px1;
	var py2 = -py1;
	canvas.beginPath();
	canvas.moveTo(px1,py1);
	canvas.lineTo(px2,py2);
	canvas.stroke();
	canvas.closePath();
	canvas.translate(-centerY, -centerX);
}