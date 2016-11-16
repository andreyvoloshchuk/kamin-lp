$(document).ready(function(){
	
	$('.cbh-deferred__hour-val').click(function(){
		$('#cbh_timer_sel_hour').removeClass('cbh-hide');
		$('#cbh_timer_sel_hour').addClass('cbh-show');
	});
	
	$('.cbh-timer-sel__hold__hour li').click(function(){
		$('#cbh_timer_sel_hour').removeClass('cbh-show');
		$('#cbh_timer_sel_hour').addClass('cbh-hide');	
		$('.cbh-deferred__hour-val').text($(this).find('span').text());
	});
	
	$('.cbh-icon-subscribe').click(function(){
		$('#cbh_item_call').removeClass('cbh-show');
		$('#cbh_item_call').addClass('cbh-hide');
		$('#cbh_item_dialog').removeClass('cbh-hide');
		$('#cbh_item_dialog').addClass('cbh-show');
		$('.cbh-icon-subscribe').addClass('cbh-active');
		$('.cbh-icon-phone').removeClass('cbh-active');
	});
	
	$('.cbh-icon-phone').click(function(){
		$('#cbh_item_dialog').removeClass('cbh-show');
		$('#cbh_item_dialog').addClass('cbh-hide');
		$('#cbh_item_call').addClass('cbh-show');
		$('#cbh_item_call').removeClass('cbh-hide');
		$('.cbh-icon-phone').addClass('cbh-active');
		$('.cbh-icon-subscribe').removeClass('cbh-active');
	});
	
	// call form
	$('.cbh-arrow').click(function(){
		closeCallWindow();
	});
	
	$('#cbh-x').click(function(){
		closeCallWindow();
	});
	
	$('#cbh_phone_input').mask("+38 (099) 999-99-99");
	$('#cbh_phone_input_deferred').mask("+38 (099) 999-99-99");
	$('#cbh_item_dialog_input_2').mask("+38 (099) 999-99-99");
	
	$('#cbh_phone_input').focus(function(){
		$(this).val('+38 (0');
	});
	
	$('#cbh_phone_input_deferred').focus(function(){
		$(this).val('+38 (0');
	});
	
		
	$('.cbh-widget-content').hover(
		function(){ $('.cbh-widget-phone').removeClass('cbh-rotate-icon') },
		function(){ $('.cbh-widget-phone').addClass('cbh-rotate-icon') }
	);
	
	$('.cbh-widget-content').click(function(){
		$(this).removeClass('cbh-show');
		$(this).addClass('cbh-hide');
		$('#cbh_container').height($(window).height());
		$('#cbh_container').remove('cbh-hide');
		$('#cbh_container').addClass('cbh-show');
		$('#cbh_container').addClass('cbh-on');
		if(checkDate()){
			$('#cbh_item_call').addClass('cbh-show');
		}else{
			setDate();
			$('#cbh_item_call_deferred').addClass('cbh-show');
			$('.cbh-icon-phone').off('click');
		}
	});
		
	$('#cbh_send').click(function(e){

		if($('#cbh_phone_input').val().length != 19){
			$('#cbh_phone_input').css({'border-color':'#d8512d'});
			setTimeout(function(){
				$('#cbh_phone_input').removeAttr('style');
			},700);
			
		}else{
			$('#cbh_phone_input').prop('disabled', true);
			$('#cbh_send').off('click');
			var phone = $('#cbh_phone_input').val();
			var price = $('input[name=price]').val();
			var parnter = $('input[name=parnter]').val();
			start_countdown();
			
			$.ajax({
				url: '/call.php',
					dataType: 'json',
					type: 'POST',
					data: "client_phone="+phone+"&price="+price+"&parnter="+parnter ,
					processData: false,
					success: function(data){
					},
					error: function(data){
					}
			});
		}
	});
	
	
		$('#cbh_send_deferred').click(function(e){

		if($('#cbh_phone_input_deferred').val().length != 19){
			$('#cbh_phone_input_deferred').css({'border-color':'#d8512d'});
			setTimeout(function(){
				$('#cbh_phone_input_deferred').removeAttr('style');
			},700);
			
		}else{
			var phone = $('#cbh_phone_input_deferred').val();
			var price = $('input[name=price]').val();
			var parnter = $('input[name=parnter]').val();
			var time = $('.cbh-deferred__hour-val').text();
			var date = $('#call_date').text();
			
			console.log(time);
			
			$.ajax({
				url: '/call_deferred.php',
					dataType: 'json',
					type: 'POST',
					data: "client_phone="+phone+"&price="+price+"&parnter="+parnter+"&time="+time+"&date="+date ,
					processData: false,
					success: function(data){
					$('#cbh_item_call_deferred').addClass('request_sended');
					$('#cbh_item_call_deferred').html('Заявка отправлена. Не забудьте включить Ваш телефон в назначенное время');
					},
					error: function(data){
					}
			});
		}
	});
	
});

// Функция подсветки незаполненных полей
function lightEmpty(){
  form.find('.empty_field').css({'border-color':'#d8512d'});
  // Через полсекунды удаляем подсветку
  setTimeout(function(){
	form.find('.empty_field').removeAttr('style');
  },500);
}

function closeCallWindow(){
		$('#cbh_container').addClass('cbh-hide');
		$('#cbh_container').removeClass('cbh-show');
		$('#cbh_container').removeClass('cbh-on');
		$('.cbh-widget-content').removeClass('cbh-hide');
		$('.cbh-widget-content').addClass('cbh-show');
}

function simple_timer(milliseconds, block, direction) {
    var time    = milliseconds;
    direction   = direction || false;

    var seconds = Math.floor(time/1000);
	if ( seconds == 0 ){ seconds = '00'}
    else if ( seconds < 10 ) {seconds = '0'+seconds};
	
	var millisec = (time - seconds*1000)/10;
	
	if ( millisec == 0 ){ millisec = '00'}
    else if ( millisec < 10 ) {millisec = '0'+millisec};
 
    block.innerHTML = seconds+':'+millisec;
 
    if ( direction ) {
        time+=10;
 
        setTimeout(function(){ simple_timer(time, block, direction); }, 10);
    } else {
        time-=10;
 
        if ( time >= 0 ) {
            setTimeout(function(){ simple_timer(time, block, direction); }, 10);
        } 
    }
}

function start_countdown() {
    var block = document.getElementById('coutdown');
    simple_timer(15000, block);
}

function checkDate(){
	
	var result = true;
	
	var currentdate = new Date();
	var day = currentdate.getDay();
	var time = currentdate.getHours();
	console.log(day);
	console.log(time);
	if((day != 0 && day != 6 && (time < 9 || time >= 20)) || ((day == 0 || day == 6)) && (time < 10 || time >= 17)){
		result = false;
	}
	
	return result;
}

function setDate(){
	var currentdate = new Date();
	var day = currentdate.getDay();
	var time = currentdate.getHours();
	
	var requireDate = new Date();
	
	if((day != 0 && day != 6 && time < 9 && time >= 0) || ((day == 0 || day == 6) && time < 10 && time >= 0)){
		requireDate.setDate(requireDate.getDate()); 
	}else if((day != 0 && day != 6 && time > 20) || ((day == 0 || day == 6) && time > 17)){
		requireDate.setDate(requireDate.getDate()+1); 
	}
	
	var dd = requireDate.getDate();
	var mm = requireDate.getMonth() + 1;
	
	var time_to_call = (dd<10 ? ('0' + dd) : dd) + '.' + (mm<10 ? ('0' + mm) : mm)

	$('#call_date').text(time_to_call);
}

