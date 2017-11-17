// count the characters that user type in .new-tweet textarea
$(() => {
	var maxNum = 140;
	var $tweet = $('.new-tweet textarea');
	// Add listener
	$tweet.on('input', function(event){
		var $counter = $(this).parent().find('.counter');
		// find the counter value
		var $counterVal = maxNum - $(this).val().length;
		// update the counter value
		$counter.text($counterVal);
		// appear red when exceed the 140 limit
		if($counterVal < 0) {
			$counter.addClass('error');
		}else {
			$counter.removeClass('error');
		}
	});	
});