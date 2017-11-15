/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



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



function renderTweets(){
  $tweets = data.map(x => createTweetElement(x));
  $('#tweets-container').append($tweets);
}

$(document).ready(function(){
  renderTweets();

  $('.new-tweet form').on("submit", $(this).serialize(), function(event){
    event.preventDefault();
    // const data = {text: $(this)[0][0].value}; //bad
    const data = $(this).serialize();
    console.log(data);
    $.ajax({url:"/tweets",
            method:"POST",
            data: data,
            success(){
              console.log("success");
            }
    });
  });

});




