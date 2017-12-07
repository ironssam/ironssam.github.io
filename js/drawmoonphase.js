function drawmoonphase(canvas, midnightangle, centerX, centerY, radius, phase, fraction, strokeWidth, riseAngle, setAngle, latitude) {
	var pifourth = Math.PI/4;
	var controlDistance = ((4/3)*Math.tan(pifourth))*radius;
	var face = (fraction*2)-1;
	var controlshift = controlDistance*face;
	var startX = angleToX(.5*Math.Pi, radius);
	var startY = angleToY(.5*Math.Pi, radius);
	var endX = angleToX(1.5*Math.Pi*radius);
	var endY = angleToY(1.5*Math.Pi*radius);
	var highMoonAngle = (riseAngle + setAngle)/2;
	var midnightangleX = angleToY(highMoonAngle, radius*6);
	var midnightangleY = angleToX(highMoonAngle, radius*6);
	var rotation = (-(-45/90)*(.5*Math.PI)+(.5*Math.PI));
	console.log(latitude);
	console.log(rotation);
	canvas.lineWidth = strokeWidth;
	canvas.translate(centerY-midnightangleY, centerX-midnightangleX);
	canvas.rotate(rotation);
	//draw background
	if (phase > .5) {
		canvas.fillStyle = "#fff";
		canvas.beginPath();
		canvas.arc(0,0, radius, 0, 2*Math.PI, true);
		canvas.fill();
		canvas.closePath();
		canvas.strokeStyle = "#000";
		canvas.fillStyle = "#000";
	} else {
		canvas.fillStyle = "#000";
		canvas.beginPath();
		canvas.arc(0,0, radius, 0, 2*Math.PI, true);
		canvas.fill();
		canvas.closePath();
		canvas.strokeStyle = "#fff";
		canvas.fillStyle = "#fff";
		controlshift = -controlshift;
	}
	canvas.beginPath();
	canvas.arc(0, 0, radius, .5*Math.PI, 1.5*Math.PI, true);
	canvas.moveTo(0, -radius);
	canvas.bezierCurveTo(controlshift, -radius, controlshift, radius, 0, radius);
	canvas.fill();
	canvas.closePath();
	canvas.strokeStyle = "#000";
	canvas.beginPath();
	canvas.arc(0,0, radius, 0, 2*Math.PI, true);
	canvas.stroke();
	canvas.closePath();
	canvas.rotate(-rotation);
	canvas.translate(-(centerY-midnightangleY), -(centerX-midnightangleX));
}