function drawsolarclockfields(canvas, radius, centerX, centerY, startAngle, endAngle, strokeWidth, strokeColor, fillColor, treatment) {
	var startAngleX = angleToX(startAngle, radius);
	var startAngleY = angleToY(startAngle, radius);
	canvas.fillStyle = fillColor;
	canvas.strokeStyle = strokeColor;
	canvas.lineWidth = strokeWidth;
	canvas.translate(centerY, centerX);
	canvas.beginPath();
	canvas.arc(0, 0, radius, startAngle, endAngle, false);
	canvas.quadraticCurveTo(0, 0, startAngleX, startAngleY);
	if (treatment == 'stroke') {
		canvas.stroke();
	} else if (treatment == 'fill') {
		canvas.fill();
	} else if (treatment == 'both') {
		canvas.fill();
		canvas.stroke();
	}
	canvas.closePath();
	canvas.translate(-centerY, -centerX);
}