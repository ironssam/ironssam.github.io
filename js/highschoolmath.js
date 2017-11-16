function angleToX(angle, radius) {
	var theta = angle;
	var x = Math.cos(theta) * radius;
	return x;
}

function angleToY(angle, radius) {
	var theta = angle;
	var y = Math.sin(theta) * radius;
	return y;
}

// Plot times on a 24 hour circle
function timeToRadians(date) {
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var angle = (((h/24)+(m/24/60)+(s/24/60/60))*(2*Math.PI))+(.5*Math.PI);
	return angle;
}

function drawcircle(canvas, radius, centerX, centerY, strokeWidth, strokeColor, fillColor, treatment) {
	canvas.fillStyle = fillColor;
	canvas.strokeStyle = strokeColor;
	canvas.lineWidth = strokeWidth;
	canvas.translate(centerY, centerX);
	canvas.beginPath();
	canvas.arc(0, 0, radius, 0, 2 * Math.PI, false);
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