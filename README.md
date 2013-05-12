GoalMeter
=========

A simple progress bar / goal meter / "thermometer" display for displaying the progress towards a particular goal. 

This jQuery plugin is pretty simple and requires you to have only some basic markup - styling is up to you. Do take a look at the base styles provided to get an idea of what elements you can/should apply styles to.

## Starting out
Basic Markup required:

	<div id="goal-meter-1" class="goal-meter">
	
		<div class="goal-meter-track">
			<div class="goal-meter-goal">
				<div class="goal-meter-amount"> 90000 </div>
			</div>
			<div class="goal-meter-progress">
				<div class="goal-meter-amount">47835 </div>
			</div>
		</div>
	
	</div>

The Goal Meter can then be called with:

	$("#goal-meter-1").goalMeter()

## Available Options

	goalAmount:     0     // Number:   Goal Amount 
	progressAmount: 0,    // Number:   Progress Amount
	animate:        true, // Boolean:  Animate? 
	slideDuration:  1000, // Number:   Animation speed of the progress bar (milliseconds)
	fadeDuration:   500,  // Number:   Animation fade in speed of the amount (ms)
	formatter:      null  // Function: Optional formatter function.  


## Examples

Simple goal meter with numbers already in the DOM

	$(".goal-meter").goalMeter();

Provide your own values

	$("#goal-meter").goalMeter({
		goalAmount: 1000,
		progressAmount: 425
	});

Using a formatter

	$(".goal-meter").goalMeter({
		formatter: function(number) {
			return "$" + number; //just prepend the number with a currency symbol
		}
	})

Live updating 

	// Somewhere at the start of your code - you init the goal meter

	$("#goal-meter").goalMeter(); // let's say your DOM had a goal of 1000 and a progress of 425

	// Sometime later...
	// You might get some data from the server via an asynchronous request.
	// If you want to update the goal meter simply call it on that same element...
	// Just with updated values.

	$("#goal-meter").goalMeter({ progressAmount: 535 });
	

## Origins

The initial goal of this script was to provide a "Fund raising thermometer". 

