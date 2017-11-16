function drawMarker(canvas, centerX, centerY, angle, radius, width, length, cap, color) {
	canvas.lineCap = cap;
	canvas.lineWidth = width;
	canvas.strokeStyle = color;
	canvas.translate(centerY, centerX);
	var px1 = angleToX(angle,radius);
	var py1 = Math.sin(angle)*radius;
	var px2 = Math.cos(angle)*(radius+length);
	var py2 = Math.sin(angle)*(radius+length);
	canvas.beginPath();
	canvas.moveTo(px1,py1);
	canvas.lineTo(px2,py2);
	canvas.stroke();
	canvas.closePath();
	canvas.translate(-centerY, -centerX);
}