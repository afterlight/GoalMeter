

// Lovingly copied and pasted from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
function formatCurrency(n, c, d, t) {
    "use strict";

    var s, i, j;

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    s = n < 0 ? "-" : "";
    i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}



$(document).ready(function(){
	"use strict";

	// Example using a formatter function
	$("#goal-meter-1").goalMeter({
		formatter: function(number) {
			return "$" + formatCurrency(number);
		}
	});

	// You can also pass in your amounts from the start.
	$("#goal-meter-2").goalMeter({
		goalAmount: 1000000,
		progressAmount: 200000
	});

    //call without the parameters to have it read from the DOM
    //$("#goal-meter-1").goalMeter();
    // or with parameters if you want to update it using JavaScript.
    // you can update it live, and choose whether to show the animation
    // (which you might not if the updates are relatively small)
    //$("#goal-meter-1").goalMeter({ progressAmount: 123456 });

});
