function drawKickAssClock (position) {
	var d = new Date();
	d.toUTCString();
	var da = Math.floor(d.getTime() / 1000);
	console.log("Da: " + da);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	        alert(xhr.responseText);
	    }
	}
	xhr.open('GET', "https://maps.googleapis.com/maps/api/timezone/json?location=" + position.latitude + "," + position.longitude + "&timestamp=" + da + "&key=AIzaSyCc4LKuyMPiTvjlUSK1uL7kbxP0R17u88M", true);
	xhr.send(null);

	/* Get date at lat long
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/timezone/json?location=" + position.latitude + "," + position.longitude + "&timestamp=" + da + "&key=AIzaSyCc4LKuyMPiTvjlUSK1uL7kbxP0R17u88M", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    var offset = response.rawOffset;
    console.log(offset);*/

	// Today's sun info
	var times = SunCalc.getTimes(new Date(), position.latitude, position.longitude);

	// Today's moon info
	var moontimes = SunCalc.getMoonTimes(new Date(), position.latitude, position.longitude);
	var moonface = SunCalc.getMoonIllumination(new Date());
	var up = Boolean(moontimes.alwaysUp);
	var down = Boolean(moontimes.alwaysDown);

	// Set up the canvas
	var canvas = document.getElementById("clock");
	var center = centerCanvas(canvas);
	var ctx = canvas.getContext("2d");

	// Design details
	var numbersMinor = 4; // Light stroke
	var numbersMiddle = 7; // Medium stroke
	var numbersMajor = 9; // Heavy stroke
	var markerWidth = numbersMajor;
	var radius = center*.7; // Solar clock radius
	var markerRadius = center-numbersMajor; // 24 hour clock radius
	var moonRadius = radius-(7); // Moon times indicator radius
	var moonStroke = 14;
	var black = 'rgba(0,0,0,1)'; // Colors
	var white = 'rgba(255,255,255,1)';
	var faceOverlay = 'rgba(255,255,255,0)';
	var dayColor = 'rgba(255,244,203,1)';
	var goldenHourColor = 'rgba(246,173,158,1)';
	var sunriseSetColor = 'rgba(229,122,166,1)';
	var twilightColor = 'rgba(166,79,176,1)';
	var nightColor = 'rgba(99,49,162,1)';
	var moonColor = 'rgba(85,85,85,1)';

	// Transform times into 24 hour clock angles
	var sunriseAngle = timeToRadians(times.sunrise);
	var sunsetAngle = timeToRadians(times.sunset);
	var solarNoonAngle = timeToRadians(times.solarNoon);
	var midnightAngle = timeToRadians(times.nadir);
	var nightStartAngle = timeToRadians(times.night);
	var nightEndAngle = timeToRadians(times.nightEnd);
	var twilightStartAngle = timeToRadians(times.dusk);
	var twilightEndAngle = timeToRadians(times.dawn);
	var goldenHourStartAngle = timeToRadians(times.goldenHourEnd);
	var goldenHourEndAngle = timeToRadians(times.goldenHour);
	var moonriseAngle = timeToRadians(moontimes.rise);
	var moonsetAngle = timeToRadians(moontimes.set);

	// Fill the sun clock
	drawcircle(ctx, radius, center, numbersMajor, black, dayColor, 'fill');
	drawsolarclockfields(ctx, radius, center, goldenHourEndAngle, goldenHourStartAngle, solarNoonAngle, numbersMinor, black, goldenHourColor, 'fill');
	drawsolarclockfields(ctx, radius, center, sunsetAngle, sunriseAngle, solarNoonAngle, numbersMiddle, black, sunriseSetColor, 'fill');
	drawsolarclockfields(ctx, radius, center, twilightStartAngle, twilightEndAngle, solarNoonAngle, numbersMinor, black, twilightColor, 'fill');
	drawsolarclockfields(ctx, radius, center, nightStartAngle, nightEndAngle, solarNoonAngle, numbersMinor, black, nightColor, 'fill');

	// Indicators
	drawMarker(ctx, center, solarNoonAngle, radius, markerWidth, 12, 'butt', dayColor); //Solar noon indicator
	drawMarker(ctx, center, solarNoonAngle-1.0472, radius, markerWidth, 12, 'butt', black); // Solar 8 hour working day
	drawMarker(ctx, center, solarNoonAngle+1.0472, radius, markerWidth, 12, 'butt', black);

	// Stroke the sun clock
	drawsolarclockfields(ctx, radius, center, goldenHourEndAngle, goldenHourStartAngle, solarNoonAngle, numbersMinor, black, goldenHourColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, sunsetAngle, sunriseAngle, solarNoonAngle, numbersMiddle, black, sunriseSetColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, twilightStartAngle, twilightEndAngle, solarNoonAngle, numbersMinor, black, twilightColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, nightStartAngle, nightEndAngle, solarNoonAngle, numbersMinor, black, nightColor, 'stroke');

	// 24 hour clock hour indicators
	drawNumbers(ctx, center, markerRadius, numbersMinor, numbersMinor, numbersMajor*1.5, numbersMajor*2, 'butt', black);

	// Moon phase clock indicator stroke
	drawmoonphase(ctx, midnightAngle, center, radius*.125, moonface.phase, moonface.fraction, numbersMinor);

	// Stroke the clocks
	// Draw the moon stroke
	if (up==true) {
		drawcircle(ctx, radius, center, numbersMajor, moonColor, dayColor, 'stroke'); // Sun clock stroke
	}
	if (down==false && up==false) {
		drawcircle(ctx, radius, center, numbersMajor, black, dayColor, 'stroke'); // Sun clock stroke
		drawmoonstroke(ctx, center, moonriseAngle, moonsetAngle, radius, moonColor, numbersMajor+1, 'square');
	}
	drawcircle(ctx, markerRadius, center, numbersMinor, black, dayColor, 'stroke'); // 24 hour clock stroke

	// Draw the time
	drawTime(center, ctx, markerRadius, numbersMajor);
	drawAlpha(ctx, center, markerRadius);
	console.log("drew it");
}