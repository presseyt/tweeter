
$(document).ready(function(){
  //check whether the input is too long
  $('.new-tweet textarea').on('input', function(){
    let text = $(this).val();
    $('.counter').text(140 - text.length)
                 .toggleClass('tooLong', text.length > 140);
  });
});