$(document).ready(function(){
	
	var maxNum = 140;
	var $tweet = $('.new-tweet textarea');
	// Add listener
	$tweet.on('keyup', function(event){
		var $counter = $($(this).next().next()); //$('span.counter');
		// find the counter value
		var $counterVal = maxNum - $(this).val().length;
		// update the counter value
		$counter.text($counterVal);
		// appear red when exceed the 140 limit
		if($counterVal < 0) {
			$counter.css({'color': 'red'});
		}
	});

	
});