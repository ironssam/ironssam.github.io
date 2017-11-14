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
function timeToRadians(date, offset) {
	var h = date.getHours();
	var hoff = h + offset;
	var m = date.getMinutes();
	var s = date.getSeconds();
	var angle = (((hoff/24)+(m/24/60)+(s/24/60/60))*2*Math.PI)+(1.5*Math.PI);
	return angle;
}

function drawcircle(canvas, radius, center, strokeWidth, strokeColor, fillColor, treatment) {
	canvas.fillStyle = fillColor;
	canvas.strokeStyle = strokeColor;
	canvas.lineWidth = strokeWidth;
	canvas.translate(center, center);
	canvas.beginPath();
	canvas.arc(0, 0, radius, 0, 2 * Math.PI, false);
	if (treatment == 'stroke' || treatment == 'both') {
		canvas.stroke();
	} else if (treatment == 'fill' || treatment == 'both') {
		canvas.fill();
	}
	canvas.closePath();
	canvas.translate(-center, -center);
}