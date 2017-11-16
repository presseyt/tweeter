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

function doSomethingToDates(tweetDate){
  let elapsed = Date.now() - tweetDate;
  console.log(elapsed);
  elapsed /= 1000;
  if (elapsed < 60) return `${Math.floor(elapsed)} seconds ago`;
  elapsed /=  60;
  if (elapsed < 60) return `${Math.floor(elapsed)} minutes ago`;
  elapsed /=  60;
  if (elapsed < 24) return `${Math.floor(elapsed)} hours ago`;
  elapsed /=  24;
  if (elapsed < 30) return `${Math.floor(elapsed)} days ago`;
  elapsed /= 30;
  if (elapsed < 12) return `${Math.floor(elapsed)} months ago`;
  elapsed /=  12;
  if (elapsed < 10) return `${Math.floor(elapsed)} years ago`;
  elapsed /=  10;
  return `${Math.floor(elapsed)} decades ago`;
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
        Created: ${doSomethingToDates(tweetInfo.created_at)}
        <span class="tweet-actions">
             🚩 🔃 💖
        </span>
      </footer>
    </article>
  `);
}

function renderTweets(data){
  //newest first
  $tweets = data.map(x => createTweetElement(x)).reverse();
  $('#tweets-container').append($tweets);
}

function loadTweets(){
  $.ajax({
    url: "/tweets",
    success(data){
      //clear all tweets, then render new tweets
      $('#tweets-container').empty();
      renderTweets(data);
    }
  });
}


$(document).ready(function(){
  //renderTweets(data);
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
    } else if (text.length > 140){
      $('.error').text('Tweet too long');
    } else {
      $.post("/tweets", data, () => {
        //clear text and any error message
        $(this).find('textarea').val('');
        $('.error').text('');

        //reload all the tweets!
        loadTweets();
      });
    }

    //here is some ajax code that  will post data:
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




