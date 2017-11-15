$(document).ready(function(){
	
	var maxNum = 140;
	var $tweet = $('.new-tweet textarea');
	// Add listener
	$tweet.on('keyup', function(event){
		var $counter = $($(this).next().next()); //$('span.counter');
		//change the counter 
		var $counterVal = maxNum - $(this).val().length;
		$counter.text($counterVal);
		console.log($counterVal);
		if($counterVal < 0) {
			$counter.css({'color': 'red'});
		}
	});

	
});