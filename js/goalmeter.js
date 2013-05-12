//
// GoalMeter jQuery plugin.
//
// This plugin aims to provide some simple "Goal Meter" type functionality.
//
// Author: John Van Der Loo
// Website: http://www.afterlight.com.au
// License: Apache
//
//
//

/**
 *
 * GoalMeter jQuery plugin.
 *
 * @param {jQuery} $
 * @param {Window} window
 * @param {HTMLDocument} document
 * @param {undefined} undefined
 *
 */
;(function ( $, window, document, undefined ) {
	"use strict";
    var pluginName = "goalMeter",
        defaults = {
            goalAmount: 0,
			progressAmount: 0,
			animate: true,
			slideDuration: 1000,
			fadeDuration: 500,
			formatter: null
        };

	/**
	 * Goal Meter constructor. All the fun stuff happens here.
	 *
	 * This plugin will update the progress element in the "Goal Meter"
	 * to the updated percentage.
	 * If no parameters are passed in it will read them from the DOM
	 *
	 * @param {Node}   element
	 * @param {Object} options
	 * @constructor
	 */
    function GoalMeter( element, options ) {
        this.element = element;
		this.$element = $(element);

		this.extendOptions(options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }


    GoalMeter.prototype = {

		extendOptions: function goalMeterExtendOptions(options) {
			if (typeof this.options === "object") {
				// don't merge defaults in - we've already got
				// an options object - use those as defaults instead.
				defaults = this.options;
			}

	        this.options = $.extend( {}, defaults, options );
		},

		/**
		 * Initialise this Goal Meter
		 */
        init: function goalMeterInit() {

			// get all them DOM references yo.
			this.$progress = $(".progress", this.$element);
			this.$goal = $(".goal", this.$element);

			// What axis are we on?
			this.isHorizontal = this.$element.hasClass("horizontal");

			// init a clean CSS object
			this.newCSS = {};

			// update the meter
			this.update();

        },


		/**
		 * Update the Goal Meter.
		 *
		 * Gets the values, calculates the updated percentage and
		 * figures out the new CSS before calling the render method.
		 *
		 * We optionally use the newly added options to base our update on.
		 *
		 * @param {Object} [options]
		 */
		update: function goalMeter_update(options) {
			if (typeof options === "object") {
				this.extendOptions(options);
			}

			// Get ze values
			this.goalAmount = this.getGoalAmount();
			this.progressAmount = this.getProgressAmount();

			// Apply some math to this stuff.
			this.percentageAmount = Math.min(
				Math.round(
					this.progressAmount / this.goalAmount * 1000
				) / 10, 100
			); //make sure we have 1 decimal point :)

			// figure out the new width/height
			this.newCSS[ this.isHorizontal ? "width" : "height" ] = this.percentageAmount + "%";

			// render stuff. Yeah.
			this.render();

		},

		/**
		 * Get the Goal Amount - either look at the passed in option or look in the DOM
		 * @returns {Number}
		 */
		getGoalAmount: function goalMeterGetGoalAmount() {
			return this.options.goalAmount || parseFloat( this.$goal.text() );
		},

		/**
		 * Get the Progress Amount - either look at the passed in option or look in the DOM
		 * @returns {Number}
		 */
		getProgressAmount: function goalMeterGetProgressAmount() {
			return this.options.progressAmount || parseFloat( this.$progress.text() );
		},

		/**
		 * Format the output numbers with an a formatter if one is provided.
		 *
		 * @param {Number} number
		 * @returns {String|Number}
		 */
		format: function goalMeterFormat( number ) {

			if (typeof this.options.formatter === "function") {
				return this.options.formatter( number );
			}

			return number;
		},

		/**
		 * Render the things!
		 * This will dump the updated (potentially formatted) numbers in to the .amount
		 * divs and then slide the goal meter to the current place.
		 *
		 */
		render: function goalMeterRender() {
			var self = this;

			//let's hide the progress indicator
			this.$progress.find(".amount").hide();

			this.$goal.find(".amount").text( this.format( this.goalAmount ) );
			this.$progress.find(".amount").text( this.format( this.progressAmount ) );

			if (this.options.animate !== false) {
				this.$progress.animate( this.newCSS, this.options.slideDuration, function(){
					$(this).find(".amount").fadeIn(self.options.fadeDuration);
				});
			}
			else {
				this.$progress.css( this.newCSS );
				this.$progress.find(".amount").fadeIn( this.options.animate ? this.options.fadeDuration : 0 );
			}
		}

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new GoalMeter( this, options ));
            }
			else {
				// if we have a reference already, perform an update
				$.data(this, "plugin_" + pluginName).update(options);
			}
        });
    };

})( jQuery, window, document );

//Lovingly copied and pasted from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
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
	$("#thermo1").goalMeter({
		formatter: function(number) {
			return "$" + formatCurrency(number);
		}
	});

	// Or just plain.
	$("#thermo2").goalMeter();

    //call without the parameters to have it read from the DOM
    //$("#thermo1").goalMeter();
    // or with parameters if you want to update it using JavaScript.
    // you can update it live, and choose whether to show the animation
    // (which you might not if the updates are relatively small)
    //$("#thermo1").goalMeter({ progressAmount: 123456 });

});



// LICENSE
//
// Copyright 2013 John Van Der Loo <jvanderloo@gmail.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
