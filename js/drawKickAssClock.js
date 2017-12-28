function drawKickAssClock (position) {
	var today = new Date();
	var todayMonth = today.getMonth();
	var todayDay = today.getDay();

	// Equinox. Which hemisphere gets all day sun?
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
	var radius = small-numbersMajor; // Solar clock radius
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

	/* ========================= */
	/* =======CLOCK FACE======== */
	/* ======AKA SUN SHIV======= */
	/* ========================= */

	// Fill the sun clock
	// 24 hour sun
	if ((position.latitude >= 0 && allDaySun == 'north') || (position.latitude <= 0 && allDaySun == 'south')) {
		drawcircle(ctx, radius, posx, posy, numbersMajor, black, dayColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'fill');
		drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMinor, black, sunriseSetColor, 'both');
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
			drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'both');
			drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		} else {
			drawcircle(ctx, radius, posx, posy, numbersMajor, black, dayColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, goldenHourEndAngle, goldenHourStartAngle, numbersMinor, black, goldenHourColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, sunsetAngle, sunriseAngle, numbersMiddle, black, sunriseSetColor, 'both');
			drawsolarclockfields(ctx, radius, posx, posy, twilightStartAngle, twilightEndAngle, numbersMinor, black, twilightColor, 'fill');
			drawsolarclockfields(ctx, radius, posx, posy, nightStartAngle, nightEndAngle, numbersMinor, black, nightColor, 'fill');
		}
	}

	// Indicators
	drawLine(ctx, posx, posy, solarNoonAngle, radius, numbersMinor, radius/10, 'butt', black); //Solar noon indicator

	/* =============================== */
	/* ========== MOON SHIV ========== */
	/* =============================== */

	// Moon came up today? Sets today?
	if (moontimes.rise == null && moontimes.set != null) { // Rose yesterday and sets today
		var moonriseAngle = 0+(.5*Math.PI);
		var moonsetAngle = timeToRadians(moontimes.set);
		var wtf = 'onlyset';
		var moonriseSec = 0;
		var moonsetSec = moontimes.set.getTime() / 1000;
	} else if (moontimes.rise == null && moontimes.set == null) { // Always up or always down
		var moonriseAngle = 0+(.5*Math.PI);
		var moonsetAngle = 2*Math.PI+(.5*Math.PI);
		var wtf = 'always';
		var moonriseSec = 0;
		var moonsetSec = 0;
	} else if (moontimes.rise != null && moontimes.set == null) { // Rose today, sets tomorrow
		var moonriseAngle = timeToRadians(moontimes.rise);
		var moonsetAngle = 2*Math.PI+(.5*Math.PI);
		var wtf = 'onlyrise';
		var moonriseSec = moontimes.rise.getTime() / 1000;
		var moonsetSec = 0;
	}
	else { // Rises today AND sets today
		var moonriseAngle = timeToRadians(moontimes.rise);
		var moonsetAngle = timeToRadians(moontimes.set);
		var wtf = 'normal';
		var moonriseSec = moontimes.rise.getTime() / 1000;
		var moonsetSec = moontimes.set.getTime() / 1000;
	}

	// Draw the moon stroke
	// If it's always up, draw a circle
	// If it's always down, do nothing
	if (up==true) {
		drawcircle(ctx, radius*.5, posx, posy, numbersMinor, black, dayColor, 'stroke'); // Moon clock stroke
		drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*0.125, moonface.phase, moonface.fraction, numbersMinor, 0.5*Math.PI, 0.5*Math.PI, position.latitude);
	} else if (down==false && up==false) {
		// If the moon only sets, or rises/sets, or sets/rises do this
		if (wtf == 'onlyset' || wtf == 'normal') {
			if (moonsetSec < moonriseSec) { // if it sets then rises
				// Dummy angles for arc endpoint (00:00 and 24:00)
				var moonriseAngle1 = 0+(.5*Math.PI);
				var moonsetAngle1 = 2*Math.PI+(.5*Math.PI);
				// draw arc from 00:00 to set, then rise to 24:00
				drawmoonstroke(ctx, posx, posy, moonriseAngle1, moonsetAngle, radius*1.025, black, numbersMinor, 'square');
				drawmoonstroke(ctx, posx, posy, moonriseAngle, moonsetAngle1, radius*.975, black, numbersMinor, 'square');
				// find which arc is bigger, then place moon phase in center of that arc
				var compare = moonriseAngle1 - moonsetAngle;
				var contrast = moonriseAngle - moonsetAngle1;
				if (contrast <= compare) {
					drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*0.125, moonface.phase, moonface.fraction, numbersMinor, moonriseAngle, moonsetAngle1, position.latitude);
				} else {
					drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*0.125, moonface.phase, moonface.fraction, numbersMinor, moonriseAngle1, moonsetAngle, position.latitude);
				}
			} else {  // if it rises, then sets, easy peasy
				drawmoonstroke(ctx, posx, posy, moonriseAngle, moonsetAngle, radius, black, numbersMinor, 'square');
				drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*0.125, moonface.phase, moonface.fraction, numbersMinor, moonriseAngle, moonsetAngle, position.latitude);
			} // TODO: what if it rises, sets, then rises again? or sets, rises, then sets. Rare.
		} else {  // if it rises, then sets, easy peasy
			drawmoonstroke(ctx, posx, posy, moonsetAngle, moonriseAngle, radius, black, numbersMinor, 'square');
			drawmoonphase(ctx, solarNoonAngle, posx, posy, radius*0.125, moonface.phase, moonface.fraction, numbersMinor, moonriseAngle, moonsetAngle, position.latitude);
		}
	}

	// Stroke the clock
	drawcircle(ctx, radius, posx, posy, numbersMiddle, black, dayColor, 'stroke'); // Sun clock stroke

	/* ========================== */
	/* ========TIME SHIV========= */
	/* ========================== */

	drawNumbers(ctx, posx, posy, markerRadius, numbersMinor, numbersMinor, numbersMajor*2, numbersMajor*3, 'butt', black);
	drawAlpha(ctx, posx, posy, radius*.75);
	drawTime(posx, posy, ctx, radius, numbersMiddle);
}