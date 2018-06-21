require("./lib/social"); //Do not delete







// DIVISION MAP CODE BELOW

// Array to hold all point IDs
var svgIDArray = ["_x31_","_x32_","_x33_","_x34_","_x35_","_x36_","_x37_","_x38_","_x39_","_x31_0","_x31_1","_x31_2","_x31_3","_x31_4","_x31_4_CAPTION"];
var tracker = -1;

// Hide all points to start
$.each(svgIDArray, function(index, item){
	$("#" + item).hide();
});

var flipPoint = function(){
	// Hide last item
	$("#" + svgIDArray[tracker]).hide();

	// Increment, wrap back around if we're over
	tracker++;
	if (tracker > svgIDArray.length-2){
		tracker = 0;
	}

	// Show next item
	$("#" + svgIDArray[tracker]).show();

	// If it's the last one, show both items
	if (tracker == svgIDArray.length-2){
		$("#_x31_4_CAPTION").show();
		// Hang on the text blurb a little longer
		setTimeout(flipPoint, 5000);
	} else {
		// Prep flip to next point
		setTimeout(flipPoint, 1500);
	}

	// If we're back at start, hide the caption for the last point
	if (tracker == 0){
		$("#_x31_4_CAPTION").hide();
	}
}

setTimeout(flipPoint, 1500);

// END DIVISION MAP CODE

