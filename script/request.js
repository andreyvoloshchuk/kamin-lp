$(document).ready(function () {
  var i = 0;
  $('#cbh_phone_input_deferred').on('click', function () {
    i = Math.round(i + 1);
  });
  $('.cbh-button').on('click', function () {
    var user_tel = $('#cbh_phone_input_deferred').val();
    var user_time = $('.cbh-deferred__hour-val').text();
    if ((i > 0) && (user_tel.match(/\d{3}-\d{2}-\d{2}/img))) {
      $('#req').arcticmodal();
    } else $('#noreq').arcticmodal();
    $.ajax({
      'type': "POST",
      'url': 'http://mail-send-maks1mp.c9.io:8080/saveorder/',
      'data': JSON.stringify({
        'name': 'noname',
        'tel': user_tel,
        'time': user_time
      }),
      'contentType': "application/json",
      'dataType': "json"
    });
  });

  $(".sendform").on('click', function () {
    var form = $(this).parent("form");
    var user_name = form.find('#name').val();
    var user_phone = form.find('#tel').val();
    if ((user_name.length >= 2) && (user_phone.match(/\d{3}-\d{2}-\d{2}/img))) {
      $('#req').arcticmodal()
    } else $('#noreq').arcticmodal();

    $.ajax({
      'type': "POST",
      'url': 'http://mail-send-maks1mp.c9.io:8080/saveorder/',
      'data': JSON.stringify({
        'name': user_name,
        'tel': user_phone,
        "time": "__:__"
      }),
      'contentType': "application/json",
      'dataType': "json"
    });
  });

});