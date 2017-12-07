function drawNumbers(canvas, centerX, centerY, radius, width1, width2, minorLength, majorLength, cap, color) {
    canvas.strokeStyle = color;
    canvas.lineCap = cap;
    canvas.translate(centerY, centerX);
    radius=radius;
    for (var a=0,aMax=(2*Math.PI),aStep=(Math.PI/48); a<aMax; a+=aStep){
	    var px1 = Math.sin(a)*(radius-(minorLength/2));
	    var py1 = Math.cos(a)*(radius-(minorLength/2));
	    var px2 = Math.sin(a)*radius;
	    var py2 = Math.cos(a)*radius;
	    canvas.lineWidth = width1/2;
	    canvas.beginPath();
	    canvas.moveTo(px1, py1);
	    canvas.lineTo(px2, py2);
	    canvas.stroke();
		canvas.closePath();
	};
    for (var a=0,aMax=(2*Math.PI),aStep=(Math.PI/24); a<aMax; a+=aStep){
	    var px1 = Math.sin(a)*(radius-minorLength);
	    var py1 = Math.cos(a)*(radius-minorLength);
	    var px2 = Math.sin(a)*radius;
	    var py2 = Math.cos(a)*radius;
	    canvas.lineWidth = width1/2;
	    canvas.beginPath();
	    canvas.moveTo(px1, py1);
	    canvas.lineTo(px2, py2);
	    canvas.stroke();
		canvas.closePath();
	};
	for (var a=0,aMax=(2*Math.PI),aStep=(Math.PI/12); a<aMax; a+=aStep){
	    var px1 = Math.sin(a)*(radius-majorLength);
	    var py1 = Math.cos(a)*(radius-majorLength);
	    var px2 = Math.sin(a)*radius;
	    var py2 = Math.cos(a)*radius;
	    canvas.lineWidth = width2;
	    canvas.beginPath();
	    canvas.moveTo(px1, py1);
	    canvas.lineTo(px2, py2);
	    canvas.stroke();
		canvas.closePath();
	};
	canvas.translate(-centerY, -centerX);
}