$(document).ready(function () {
  $(".animate").animate({
    "opacity": "1"
  }, 1200);
  $(".picture img").on("click", function () {
    $('#exampleModal').arcticmodal();

    $('.image').text('');
    $(this).clone().css({
      "height": "600px",
      "width": "100%",
      "margin": "0 auto",
      left: "-20%"
    }).appendTo(".image");


  });
  var submitBtn = $('.callme');  
submitBtn.on('click', function () {
      $('#Modal').arcticmodal();
    });
  $( document ).ready( function( )
{
    new ScrollFlow(); 
} );
});