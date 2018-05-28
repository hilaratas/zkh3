export default function () {

	$.datepicker.setDefaults({
		monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
		monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
		dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		dayNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		firstDay: 1
	});


	var $datapickerInline = $(".js-datepicker-inline");
	var $datapickers = $(".js-datepicker");

	if ($datapickerInline.length) {

		$datapickerInline.datepicker({
			inline: true,
			dateFormat: "dd.mm.yy",
			beforeShowDay: function(date) {
			return setAvaDates1(date);
			},
			onChangeMonthYear: function(year, month, inst) {
				updateAvaDates1(year, month);
			},
			onSelect: function(selectedDate) {
				var date  = selectedDate.split('.'),
				day   = Number(date[0]),
				month = date[1],
				year  = date[2];

				document.location.href = seminarsLocation + 'year=' + year + 'month=' + month + 'day=' + day; 
			}
		});

		if ( typeof setDate !== "undefined" && setDate) {
			$datapickerInline.datepicker('setDate', setDate);
		}
	}

	$('.js-datepicker').each(function(index, elem) {
		var $elem = $(elem);
		var elemOpts = $elem.data();
		var dpOpts = $.extend({
			dateFormat: "dd.mm.yy",
			onSelect: function(dateText, inst) {
				var $input = $(this);
				$input.trigger("focusout"); // Для нормальной работы валидатора
                setAvailableTime($('.js-datepicker'), $('.js-timepicker'));
			}
		}, elemOpts);

		$elem.datepicker(dpOpts);
        setAvailableTime($('.js-datepicker'), $('.js-timepicker'));
	});


	function setAvaDates1(date){
		var ave_size = 0,
			a_year,
			a_month,
			a_day;

			ave_size = avalibleDates.length;
			
			a_year  = parseInt(date.getFullYear());
			a_month = parseInt(date.getMonth()); // 0 - январь 
			a_month = a_month + 1;
			a_day   = parseInt(date.getDate());
			
			for ( var j = 0; j <  ave_size; j++ ) {
				if ( a_year ==  parseInt(avalibleDates[j].year) && a_month == parseInt(avalibleDates[j].month) && a_day == parseInt(avalibleDates[j].day) ) {
					return [true, ''];
				}
			}
			return [false, ''];
		
	}

	function updateAvaDates1(year, month){

		var ajax_url = ajaxUrl + 'year=' + year + 'month=' + month;
		
		$.ajax({
			url: ajax_url,
			dataType : "text",  
			type: 'GET', 		
			success: function (data, textStatus) {
				
				avalibleDates = JSON.parse(data);
				$datapickerInline.datepicker("refresh");
			},
			error: function (data, textStatus) {
				alert("Что-то пошло не так");
			}
	    });
	}

    function setAvailableTime(dateInput, timeInput) {
        var now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf(),
            selectedDateArray = dateInput.val().split('.'),
            selectedDate = new Date(selectedDateArray[1] + '/' + selectedDateArray[0] + '/' + selectedDateArray[2]).valueOf();

        if (selectedDate === today) {
            var hour = now.getHours(),
                toSelectIndex = 0;

            timeInput.find('option').each(function(index, element) {
                var hoursArray = $(element).val().split('-');
                if (parseInt(hoursArray[0]) <= hour) {
                    $(element).prop('disabled', true);
                    toSelectIndex = index + 1;
                }

                if (index == toSelectIndex) {
                    $(element).prop('selected', true);
                }
            });
        } else {
            timeInput.find('option').each(function(index, element) {
                $(element).prop('disabled', false);

                if (index == 0) {
                    $(element).prop('selected', true);
                }
            });
        }
    }

}