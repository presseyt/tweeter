/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function escape(str) {
  //given to us by lhl.  Used to prevent people from saying their name is
    // `<script> alert('hi') </script`
    //and messing up our code.
  //note that using jQuery .text() is a safe way to do this as well.
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
        Created: ${escape(tweetInfo.created_at)}
        <span class="tweet-actions">
             🚩 🔃 💖
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
    success: renderTweets
  });
}


$(document).ready(function(){
  //renderTweets(data);
  loadTweets();

  $('.new-tweet form').on("submit", $(this).serialize(), function(event){
    event.preventDefault();
    // const data = {text: $(this)[0][0].value}; //bad
    const data = $(this).serialize();
    const text = $(this).find('textarea').val();


    if (text.length === 0){
      console.log('error - cant be empty');
    } else if (text.length > 140){
      console.log('error - too long');
    } else {
      $.post("/tweets", data);
      console.log('sent:', data);
    }
    // $.ajax({
    //   url: "/tweets",
    //   method: "POST",
    //   data: data,
    //   success(){
    //     console.log("success");
    //   }
    // });
  });

});




