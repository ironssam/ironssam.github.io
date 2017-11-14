function drawsolarclockfields(canvas, radius, center, startAngle, endAngle, strokeWidth, strokeColor, fillColor, treatment) {
	var startAngleX = angleToX(startAngle, radius);
	var startAngleY = angleToY(startAngle, radius);
	canvas.fillStyle = fillColor;
	canvas.strokeStyle = strokeColor;
	canvas.lineWidth = strokeWidth;
	canvas.translate(center, center);
	canvas.beginPath();
	canvas.arc(0, 0, radius, startAngle, endAngle, false);
	canvas.quadraticCurveTo(0, 0, startAngleX, startAngleY);
	if (treatment == 'stroke' || treatment == 'both') {
		canvas.stroke();
	} else if (treatment == 'fill' || treatment == 'both') {
		canvas.fill();
	}
	canvas.closePath();
	canvas.translate(-center, -center);
}