
$(document).ready(function(){

  $('.new-tweet textarea').on('input', function(){
    let text = $(this)[0].value;
    $('.counter').text(140 - text.length)
                 .toggleClass('tooLong', text.length > 140);
  });

});