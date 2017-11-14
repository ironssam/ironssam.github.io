function drawKickAssClock (position) {
	var today = new Date();
	var offset = today.getTimezoneOffset();

	// Today's sun info
	var times = SunCalc.getTimes(today, position.latitude, position.longitude);

	// Today's moon info
	var moontimes = SunCalc.getMoonTimes(today, position.latitude, position.longitude);
	var moonface = SunCalc.getMoonIllumination(today);
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
	var sunriseAngle = timeToRadians(times.sunrise, offset);
	var sunsetAngle = timeToRadians(times.sunset, offset);
	var solarNoonAngle = timeToRadians(times.solarNoon, offset);
	var midnightAngle = timeToRadians(times.nadir, offset);
	var nightStartAngle = timeToRadians(times.night, offset);
	var nightEndAngle = timeToRadians(times.nightEnd, offset);
	var twilightStartAngle = timeToRadians(times.dusk, offset);
	var twilightEndAngle = timeToRadians(times.dawn, offset);
	var goldenHourStartAngle = timeToRadians(times.goldenHourEnd, offset);
	var goldenHourEndAngle = timeToRadians(times.goldenHour, offset);
	var moonriseAngle = timeToRadians(moontimes.rise, offset);
	var moonsetAngle = timeToRadians(moontimes.set, offset);

	// Fill the sun clock
	drawcircle(ctx, radius, center, numbersMajor, black, dayColor, 'fill');
	drawsolarclockfields(ctx, radius, center, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'fill');
	drawsolarclockfields(ctx, radius, center, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'fill');
	drawsolarclockfields(ctx, radius, center, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
	drawsolarclockfields(ctx, radius, center, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');

	// Indicators
	drawMarker(ctx, center, solarNoonAngle, radius, markerWidth, 12, 'butt', dayColor); //Solar noon indicator
	drawMarker(ctx, center, solarNoonAngle-1.0472, radius, markerWidth, 12, 'butt', black); // Solar 8 hour working day
	drawMarker(ctx, center, solarNoonAngle+1.0472, radius, markerWidth, 12, 'butt', black);

	// Stroke the sun clock
	drawsolarclockfields(ctx, radius, center, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'stroke');
	drawsolarclockfields(ctx, radius, center, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'stroke');

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