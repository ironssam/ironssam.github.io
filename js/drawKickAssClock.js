function drawKickAssClock (position) {
	var today = new Date();
	var todayMonth = today.getMonth();
	var todayDay = today.getDay();

	if ((todayMonth >= 3 && todayDay >= 20) && (todayMonth <= 9 && todayDay <= 22)) {
		var allDaySun = 'north';
	} else {
		var allDaySun = 'south';
	}

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
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var posx = center.xpos;
	var posy = center.ypos;
	var small = center.centerSmall;

	if (canvasWidth >= canvasHeight) {
		var responsiveStroke = canvasHeight;
	} else {
		var responsiveStroke = canvasWidth;
	}

	// Design details
	var numbersMinor = responsiveStroke/144; // Light stroke
	var numbersMiddle = responsiveStroke/72; // Medium stroke
	var numbersMajor = responsiveStroke/54; // Heavy stroke
	var markerWidth = numbersMajor;
	var radius = small*.7; // Solar clock radius
	var markerRadius = small-numbersMajor; // 24 hour clock radius
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
	// 24 hour sun
	if ((position.latitude >= 0 && allDaySun == 'north') || (position.latitude <= 0 && allDaySun == 'south')) {
		drawcircle(ctx, radius, posx, posy, numbersMajor, black, dayColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
	}
	// 24 hour night
	if ((position.latitude >= 0 && allDaySun == 'south') || (position.latitude <= 0 && allDaySun == 'north')) {
		if (!isNaN(times.night.valueOf())==false) {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, nightColor, 'fill');
		} else if (!isNaN(times.dawn.valueOf())==false) {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		} else if (!isNaN(times.sunrise.valueOf())==false) {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, sunriseSetColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		} else if (!isNaN(times.goldenHour.valueOf())==false) {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, goldenHourColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		} else {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, dayColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		}
	}

	// Indicators
	drawLine(ctx, posx, posy, solarNoonAngle, radius, numbersMinor, radius/10, 'butt', black); //Solar noon indicator
	//drawMarker(ctx, posx, posy, solarNoonAngle-1.0472, radius, markerWidth, radius/10, 'butt', black); // Solar 8 hour working day
	//drawMarker(ctx, posx, posy, solarNoonAngle+1.0472, radius, markerWidth, radius/10, 'butt', black);

	// Draw the moon stroke
	if (up==true) {
		drawcircle(ctx, radius, posx, posy, numbersMajor, black, dayColor, 'stroke'); // Sun clock stroke
	}
	if (down==false && up==false) {
		drawmoonstroke(ctx, posx, posy, moonriseAngle, moonsetAngle, radius, black, numbersMinor, 'square');
	}

	// Moon phase clock indicator stroke
	drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*.125, moonface.phase, moonface.fraction, numbersMinor, moonriseAngle, moonsetAngle, position.latitude);

	drawcircle(ctx, radius, posx, posy, numbersMiddle, black, dayColor, 'stroke'); // Sun clock stroke

	// Draw the time
	// 24 hour clock hour indicators
	drawNumbers(ctx, posx, posy, markerRadius, numbersMinor, numbersMinor, numbersMajor*1.5, numbersMajor*2, 'butt', black);
	drawTime(posx, posy, ctx, markerRadius, numbersMiddle);
	drawAlpha(ctx, posx, posy, markerRadius);
	drawcircle(ctx, markerRadius, posx, posy, numbersMinor, black, dayColor, 'stroke'); // 24 hour clock stroke
}