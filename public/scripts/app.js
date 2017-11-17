
function displayDatesAsText(tweetDate){
  const time = [
    {measurment: "millisecond", quantity: 1000},
    {measurment: "second", quantity: 60},
    {measurment: "minute", quantity: 60},
    {measurment: "hour", quantity: 24},
    {measurment: "day", quantity: 7},
    {measurment: "week", quantity: 4},
    {measurment: "month", quantity: 12},
    {measurment: "year", quantity: 10},
    {measurment: "decade", quantity: 10},
    {measurment: "century", quantity: 10}
  ];
  let elapsed = Date.now() - tweetDate;
  if (elapsed < 0) {
    return "in the future!";  //just to be safe ;)
  }

  for(measure of time){
    if (elapsed < measure.quantity){
      return `${Math.floor(elapsed)} ${measure.measurment}${elapsed >= 2 ? "s" : ""} ago`;
    }
    elapsed /= measure.quantity;
  }
  return "I dunno :o";
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetInfo){
  return $(`
    <article class="tweet-container">
      <header class="tweet-header">
        <img class="profile-pic" src=${escape(tweetInfo.user.avatars.regular)}>
        <h2 class="profile-name">${escape(tweetInfo.user.name)}</h2>
        <span class="profile-handle">${escape(tweetInfo.user.handle)}</span>
      </header>
      <section>
        <p>${escape(tweetInfo.content.text)}</p>
      </section>
      <footer class="tweet-footer">
        Created: ${displayDatesAsText(tweetInfo.created_at)}
        <span class="tweet-actions">
             🚩 🔃 💖 <p>0</p>
        </span>
      </footer>
    </article>
  `);
}

function renderTweets(data){
  $tweets = data.map(x => createTweetElement(x));
  $('#tweets-container').append($tweets);
}

function loadTweets(){
  $.ajax({
    url: "/tweets",
    success(data){
      //clear all tweets, then render new tweets
      $('#tweets-container').empty();
      renderTweets(data);
      //trigger a custom event
      $('#tweets-container').trigger("loaded");
    }
  });
}


$(document).ready(function(){

  loadTweets();

  $('#toggle-composition').on("click", function(event){
    if ($('.new-tweet').is(":visible")){
      $('.new-tweet').hide(550);
    } else {
      $('.new-tweet').show(350);
      $('.new-tweet textarea').focus();
    }
  });

  $('.new-tweet form').on("submit", function(event){
    event.preventDefault();

    const data = $(this).serialize();
    const text = $(this).find('textarea').val();

    if (text.length === 0){
      $('.error').text('Tweet is empty');
      $('.new-tweet textarea').focus()
    } else if (text.length > 140){
      $('.error').text('Tweet too long');
      $('.new-tweet textarea').focus()
    } else {
      $.post("/tweets", data, () => {
        //clear text and any error message
        $(this).find('textarea').val('');

        //reload all the tweets!
        loadTweets();
      });
    }
  });

  //whenever they type, get rid of error message
  $('.new-tweet textarea').on('keydown', function(){
    $('.error').text('');
  });

});




