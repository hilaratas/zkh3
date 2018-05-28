export default function () {

	$.extend($.validator.messages, {
		required: 'Поле обязательно к заполнению',
		remote: 'Поле заполнено некорректно',
		email: 'E-mail некорректен',
		url: 'URL некорректен',
		date: 'Некорректная дата',
		dateISO: 'Введите корректную дату в формате ISO.',
		number: 'Введите число',
		digits: 'Введите только цифры',
		creditcard: 'Введите правильный номер карты',
		equalTo: 'Введите такое же значение ещё раз',
		extension: 'Выберите файл с разрешенным расширением',
		maxlength: $.validator.format('Введите не больше {0} символов'),
		minlength: $.validator.format('Введите не меньше {0} символов'),
		rangelength: $.validator.format('Введите значение длиной от {0} до {1} символов'),
		range: $.validator.format('Введите число от {0} до {1}'),
		max: $.validator.format('Введите число, меньшее или равное {0}'),
		min: $.validator.format('Введите число, большее или равное {0}'),
		tel: 'Введите телефон в формате +7 (012) 345-67-89',
		cyrillic: 'Введите русские буквы, дефис или пробел',
		passport: 'Введите данные в формате 22 00 123456',
		lc: 'Введите лицевой счет в формате 123456789',
        accept: 'Выберите файл с разрешенным расширением',
		"digits-and-cyr-chars" : 'Введите цифры или русские буквы',
		size: "Превышен допустимый размер файлов",
		oneSize: 'Превышен допустимый размер одного из файлов',
        maxCountFiles : 'Разрешается прикрепиь не больше {0} файлов',
        inn: 'Укажите 12 цифр',
        kpp: 'Укажите 9 цифр',
        okpo: 'Укажите от 8 до 10 цифр',
        oktmo: 'Укажите 11 цифр',
        ogrn: 'Укажите 13 цифр',
        okved: 'ОКВЭД указан некорректно',
        kpp: 'Укажите 9 цифр',
        rc: 'Укажите от 14 до 19 цифр',
        city: 'Город не найден. Выберите город из выпадающего списка.',
        street: 'Улица не найдена. Выберите улицу из выпадающего списка.',
        house: 'Дом не найден. Выберите дом из выпадающего списка.'
	});

	$.validator.setDefaults({
        ignore: ".ignore, :hidden"
	});

	$.validator.addMethod("greaterThan", function(value, element, params) {    
	    if (!/Invalid|NaN/.test(new Date(value))) {
	        return new Date(value) > new Date($(params[0]).val());
	    }    
	    return isNaN(value) && isNaN($(params[0]).val()) || (Number(value) > Number($(params[0]).val())); 
	},'Must be greater than {1}.');

	$.validator.addMethod("float-digits", function(value, element, param) {
		if (this.optional(element)) {
			return true;
		}
		if (typeof param === "string") {
			param = new RegExp(param);
		}
		return param.test(value);
	});

	jQuery.validator.addMethod('tel2', function(value, element) {
		return this.optional(element) || /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
	}, $.validator.messages.tel);

	jQuery.validator.addMethod('cyrillic', function (value, element) {
	    return this.optional(element) || /^[-а-яёА-ЯЁ ]+$/.test(value);
	  }, $.validator.messages.cyrillic);

	jQuery.validator.addMethod('passport', function (value, element) {
	    return this.optional(element) || /^\d{2} \d{2} \d{6}$/.test(value);
	  }, $.validator.messages.passport);

	jQuery.validator.addMethod('date2', function (value, element) {
	    return this.optional(element) || /^\d{2}\.\d{2}\.\d{4}$/.test(value);
	  }, $.validator.messages.date);

	jQuery.validator.addMethod('majority', function (value, element) {
		var bithDate = new Date(value);

		// var minDate = Date.parse('-100Y');
		// var maxDate = Date.parse('-18Y');

		// if (isNaN(Date.parse(value)) ) {
		// 	return false;
		// }

		// if ( bithDate >= maxDate || bithDate <= minDate ) {
		// 	return false;
		// }

	    return this.optional(element) || /^\d{2}\.\d{2}\.\d{4}$/.test(value);
	  }, $.validator.messages.date);

	jQuery.validator.addMethod('digits-and-cyr-chars', function (value, element) {
	    return this.optional(element) || /^[а-яёА-ЯЁ\d]+$/.test(value);
	  }, $.validator.messages['digits-and-cyr-chars']);

	jQuery.validator.addMethod('lc', function (value, element) {
	    return this.optional(element) || /^\d{9}$/.test(value);
	  }, $.validator.messages.lc);

    jQuery.validator.addMethod('size', function (value, element, param) {
        var files = element.files;
        var filesSize = 0;
        var sizeFromParam = parseInt(param);
        var sizeStr = '';

        if (typeof param !== "string")
			return true;

        if (!files.length)
        	return true;

        for (var i = 0; i < files.length; i++ ) {
            var fileSize = files[i].size || files[i].fileSize;
            filesSize += '+' + fileSize;
            sizeStr += fileSize;
		}

        return ( filesSize > sizeFromParam) ?  false : true;
    });

    $.validator.addMethod("oneSize", function(value, element, param) {
        var files = element.files;
        var fileSize = 0;
        var fileSizeFromParam = parseInt(param);

        if (this.optional(element)) {
            return true;
        }

        if (!files.length)
            return true;

        if (typeof param !== "number") {
            return true;
        }

        for ( var i = 0; i < files.length; i++ ) {
            fileSize = files[i].size || files[i].fileSize;
            if (fileSize > fileSizeFromParam )
                return false;
        }

        return true;
    });

    $.validator.addMethod("maxCountFiles", function(value, element, param) {
        var files = element.files;
        var filesCount = files.length;
        var maxFilesCount = parseInt(param);

        if (this.optional(element)) {
            return true;
        }

        if (typeof param !== "number") {
            return true;
        }

        for (var i; i = 0; i < files.length) {
            var fileSize = files[i].size;
            if (fileSize > fileSizeFromParam )
                return false;
        }

        return (filesCount > maxFilesCount) ? false : true;
    });

    jQuery.validator.addMethod('inn', function (value, element) {
	    return this.optional(element) || /^\d{12}$/.test(value);
	  }, $.validator.messages.inn);

    jQuery.validator.addMethod('kpp', function (value, element) {
	    return this.optional(element) || /^\d{9}$/.test(value);
	  }, $.validator.messages.kpp);

    jQuery.validator.addMethod('okpo', function (value, element) {
	    return this.optional(element) || /^\d{8,10}$/.test(value);
	  }, $.validator.messages.okpo);

    jQuery.validator.addMethod('ogrn', function (value, element) {
	    return this.optional(element) || /^\d{13}$/.test(value);
	  }, $.validator.messages.ogrn);

    jQuery.validator.addMethod('okved', function (value, element) {
	    return this.optional(element) || /^\d{2}(\.\d{1,2}){0,2}$/.test(value);
	  }, $.validator.messages.okved);

    jQuery.validator.addMethod('oktmo', function (value, element) {
	    return this.optional(element) || /^\d{11}$/.test(value);
	  }, $.validator.messages.oktmo);

    jQuery.validator.addMethod('rc', function (value, element) {
	    return this.optional(element) || /^\d{14,19}$/.test(value);
	  }, $.validator.messages.rc);

    jQuery.validator.addMethod('city', function (value, element) {
		var $element = $(element);
		var kladrId = parseInt($element.attr('data-kladr-id'));
        //console.log( 'city', parseInt($element.attr('data-kladr-id')));
		return this.optional(element) || !isNaN(kladrId);
	}, $.validator.messages.city);

	jQuery.validator.addMethod('street', function (value, element) {
		var $element = $(element);
        var kladrId = parseInt($element.attr('data-kladr-id'));
        //console.log( 'street', parseInt($element.attr('data-kladr-id')));
		return this.optional(element) || !isNaN(kladrId);
	}, $.validator.messages.street);

	jQuery.validator.addMethod('house', function (value, element) {
		var $element = $(element);
        var kladrId = parseInt($element.attr('data-kladr-id'));
		//console.log( 'house', parseInt($element.attr('data-kladr-id')));
		return this.optional(element) || !isNaN(kladrId);
	}, $.validator.messages.house);

	jQuery.validator.addClassRules({
		"js-mask-tel": {
			tel2: true
		},
		"js-mask-date": {
			date2: true
		},
		"js-mask-passport": {
			passport: true
		},
		"js-mask-lk": {
			lc: true
		},
		"js-form-validate__cyrillic": {
			cyrillic: true
		},
		"js-form-validate__hause": {
			digits: true
		},
		"js-form-validate__digits-and-cyr-chars": {
			"digits-and-cyr-chars": true
		},
		"js-form-validate__date": {
			date2: true
		},
		"js-form-validate__passport-date": {
			date2: true
		},
		"js-form-validate__majority": {
			majority: true
		},
		"js-form-validate__lc": {
			required: true,
			lc: true
		},
		"js-form-validate__file": {
            size: true
		},
		"js-form-validate__inn": {
            inn: true
		},
		"js-form-validate__kpp": {
            kpp: true
		},
		"js-form-validate__okpo": {
            okpo: true
		},
		"js-form-validate__oktmo": {
            oktmo: true
		},
		"js-form-validate__ogrn": {
            ogrn: true
		},
		"js-form-validate__okved": {
            okved: true
		},
		"js-form-validate__rc": {
            rc: true
		},
		"js-form-validate__city": {
            city: true
		},
		"js-form-validate__street": {
            street: true
		},
		"js-form-validate__house": {
            house: true
		}
	});

	// не переносить настройку errorPlacement в setDefaults
	$('.js-form-validate').each(function(){
        var $this_form = $(this);
		
        $this_form.validate({
        	errorPlacement: function(error, element) {
	            error.appendTo(element.closest('.form__row'));
	        }
	    });
    });

    //$('.js-form-validate').validate();

      // $('.js-form-validate').submit(function(){
      // 	return false;
      // });

    $('.js-form-validate-remote').each(function(){

		var $curForm = $(this);

		$curForm.addClassRules({
			'js-lc-data__lc': {
				required: true,
				lc: true,
				remote: '/ajax/form-ajax-lc-data-false.html'
			}
		});

		$curForm.validate({
			rules: {
		        CaptchaInputText: 
		        {
		            remote:$curForm.data('remote-url') + $curForm.serialize()
		        }
		    }, 
		    messages: {
		        CaptchaInputText: 
		        {
		            remote:"Символы введены неправильно"
		        }
		    }
		});
	});
}