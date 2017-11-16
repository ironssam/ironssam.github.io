function centerCanvas(canvas) {
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var centerx = canvasHeight/2;
	var centery = canvasWidth/2;
	if (canvasWidth >= canvasHeight) {
		var littleSide = centerx;
	} else {
		var littleSide = centery;
	}
	var center = { xpos: centerx, ypos: centery, centerSmall: littleSide };
	return center;
}