function drawTime(centerX, centerY, ctx, radius, width){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // hand
    var nowSec = (hour*60*60) + (minute*60) + second;
    var oneSecAngle = (360/86400) * (Math.PI/180);
    var nowSecAngle = nowSec * oneSecAngle;
    drawHand(centerX, centerY, ctx, nowSecAngle, radius, width);
}

function drawHand(centerX, centerY, ctx, pos, length, width) {
	ctx.translate(centerY, centerX);
	ctx.rotate(1*Math.PI);
    ctx.beginPath();
    width = width*1.5;
    length = length-(width*.5);
    ctx.lineWidth = width;
    ctx.lineCap = "square";
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = width*.33;
    ctx.lineCap = "butt";
    ctx.moveTo(0,0);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
    ctx.rotate(-1*Math.PI);
    ctx.translate(-centerY, -centerX);
}

function drawAlpha(ctx, centerX, centerY, radius) {
	var ang;
    var num;
    ctx.font = radius*0.24 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle = "#000";
    ctx.translate(centerY, centerX);
    for(num= 0; num < 24;){
        ang = (num * Math.PI / 12)+Math.PI;
        ctx.rotate(ang);
        ctx.translate(0, -radius);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);
        num = num + 3;
    }
    ctx.translate(-centerY, -centerX);
}
