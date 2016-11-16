$(document).ready(function () {
  var button = $(".accept"),
    usname = $(".name"),
    mail = $("#mail"),
    ustel = $(".tel");
  usname.blur(function () {
    if ($(this).val().length <= 2) {
      $(this).addClass("error")
        .removeClass("ok")
    } else {
      $(this).addClass("ok")
        .removeClass("error");
    }
  });

  ustel.blur(function () {
    if ($(this).val().match(/\d{3}-\d{2}-\d{2}/img)) {
      $(this).addClass("ok")
        .removeClass("error")
    } else {
      $(this).addClass("error")
        .removeClass("ok");
    }
  });

  ustel.mask("+38(099) 999-99-99");


  mail.blur(function () {
    var txt_mail = mail.val();
    if (txt_mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/img)) {
      mail.addClass("ok")
        .removeClass("error");
    } else {
      mail.addClass("error")
        .removeClass("ok");
    }
  });
});