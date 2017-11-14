function centerCanvas(canvas) {
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	if (canvasWidth > canvasHeight) {
		var center = canvasHeight/2;
	} else {
		var center = canvasWidth/2;
	}
	return center;
}