
// handle the new tweet after user click the submit button
function handleNewTweet(event) {
  event.preventDefault();
  // console.log('success');
  // give error when tweet content is too long or not present 
  const $tweeterForm = $(this).serialize();
  console.log($tweeterForm);

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
  let $section = $('#archive-tweet');
  allTweets.forEach(element => {
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $section.append(createTweetElement(element)); 
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
  const $tweeterForm = $('.new-tweet form');
  $tweeterForm.on('submit', handleNewTweet);
  loadTweets();
});