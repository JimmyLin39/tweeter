// handle the new tweet after user click the submit button
function handleNewTweet(event) {
  event.preventDefault();
  // console.log('success');
  const $form = $(this);
  const $error = $form.find('.errorMessage');
  const $tweeterForm = $form.find('textarea');
  // console.log($tweeterForm);
  // give error when tweet content not present 
  $error.empty();
  if($tweeterForm.val() === '') {
    $error.html(`<h3>Please tweet something!</h3>`);
  // give error when tweet content is too long
  } else if($tweeterForm.val().length > 140){
    $error.html(`<h3>Your tweet is too long!</h3>`);
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $form.serialize()
    })
      .done(() => {
        // Refetch tweets again
        loadTweets();
        $tweeterForm.val('');
        // reset counter
        $form.find('.counter').text('140');
      })
  }
}

// fetching tweets from the /tweets page
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (allTweets) => {
      renderTweets(allTweets);
    }
  });
}

//take array of objects and render them to the DOM
function renderTweets(allTweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  let $section = $('#archive-tweet').empty();
  allTweets.forEach(element => {
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $section.prepend(createTweetElement(element)); 
  });
};

// generate the DOM structure 
function createTweetElement(tweet) {
  return $(
    `<article class="tweet">
      <header>
        <div>
        <img src="${tweet.user.avatars.small}">
        <h2 class="userName">${tweet.user.name}</h2>
        </div>
        <span class="userId">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>${tweet.created_at}
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-flag" aria-hidden="true"></i>
      </footer>
    </article>`
  );
};

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// doc ready
$(() => {
  loadTweets();
  const $tweeterForm = $('.new-tweet form');
  $tweeterForm.on('submit', handleNewTweet);
  
});