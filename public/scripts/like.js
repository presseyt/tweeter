

$(document).ready( function(){
  //a custom event that fires whenever new tweets are added to the #tweets-container
  $('#tweets-container').on('loaded', function(){
    $('.tweet-container').on('click', function(event){
      const $likeCounter = $(this).find('.tweet-actions p');
      const path = $likeCounter.hasClass('liked') ? 'dislike' : 'like';

      $.post(`/tweets/200/${path}`, "", () => {
        //success
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
      });
    });
  });
});