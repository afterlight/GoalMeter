//originally from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
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

/**
 * Thermometer Progress meter.
 * This function will update the progress element in the "thermometer"
 * to the updated percentage.
 * If no parameters are passed in it will read them from the DOM
 *
 * @param {Number} goalAmount The Goal amount, this represents the 100% mark
 * @param {Number} progressAmount The progress amount is the current amount
 * @param {Boolean} animate Whether to animate the height or not
 *
 */
function thermometer(id, goalAmount, progressAmount, animate) {
    "use strict";

    var $thermo = $("#"+id),
        $progress = $(".progress", $thermo),
        $goal = $(".goal", $thermo),
        percentageAmount,
        isHorizontal = $thermo.hasClass("horizontal"),
        newCSS = {};

    goalAmount = goalAmount || parseFloat( $goal.text() ),
    progressAmount = progressAmount || parseFloat( $progress.text() ),
    percentageAmount =  Math.min( Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

    //let's format the numbers and put them back in the DOM
    $goal.find(".amount").text( "$" + formatCurrency( goalAmount ) );
    $progress.find(".amount").text( "$" + formatCurrency( progressAmount ) );


    //let's set the progress indicator
    $progress.find(".amount").hide();

    newCSS[ isHorizontal ? "width" : "height" ] = percentageAmount + "%";

    if (animate !== false) {
        $progress.animate( newCSS, 1200, function(){
            $(this).find(".amount").fadeIn(500);
        });
    }
    else {
        $progress.css( newCSS );
        $progress.find(".amount").fadeIn(500);
    }
}

$(document).ready(function(){

    //call without the parameters to have it read from the DOM
    thermometer("thermo1");
    // or with parameters if you want to update it using JavaScript.
    // you can update it live, and choose whether to show the animation
    // (which you might not if the updates are relatively small)
    thermometer("thermo2", 1000000, 425610 );

});

