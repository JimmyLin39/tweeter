$(document).ready(function(){
	
	var num = 140;
	var $tweet = $('.new-tweet textarea');
	// Add listener
	$tweet.on('keyup', function(event){
		var $counter = $($(this).next().next()); //$('span.counter');
// 		num--;
		//change the counter 
		$counter.text(num - $(this).val().length);
		console.log($(this).val().length);
	});

	
});