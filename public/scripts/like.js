

$(document).ready( function(){
  $('#tweets-container').on('loaded', function(){
    //a custom event that fires whenever new tweets are added to the #tweets-container
    //other people used $(body).on('click', '.tweet-actions', callback) which works much cleaner

    $('.tweet-actions').on('click', function(event){
      const $likeCounter = $(this).find('p');
      const tweetId = $(this).closest('.tweet-container').data("tweet-id");
      const path = $likeCounter.hasClass('liked') ? 'dislike' : 'like';

      $.post(`/tweets/${tweetId}/${path}`, "data", () => {
        //success
        console.log('successfully posted', path);
        if (path == 'like'){
          $likeCounter.text(Number($likeCounter.text()) + 1);
          $likeCounter.addClass('liked');
        } else {
          $likeCounter.text(Number($likeCounter.text()) - 1);
          $likeCounter.removeClass('liked');
        }
      }).fail(function(){
         //failure
        console.log('handling errors like a boss');
        //could be improved on.
      });
    });
  });
});