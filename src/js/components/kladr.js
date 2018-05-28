/**
 * Created by user on 17.11.2017.
 */
export default function() {

    $.kladr.setDefault({
        valueFormat: function(obj, query){
            var objs;

            if (query.oneString) {
                if (obj.parents) {
                    objs = [].concat(obj.parents);
                    objs.push(obj);

                    return $.kladr.buildAddress(objs);
                }
                return (obj.typeShort ? obj.typeShort + '. ' : '') + obj.name;
            }

            switch (obj.contentType) {
                case 'street':
                    return obj.name + ' ' + obj.typeShort + '.';
                    break;
                default:
                    return obj.name;
            }
        },
        select: function (obj) {
            switch (obj.contentType) {
                case 'street':
                    return obj.name + ' ' + obj.typeShort + '.';
                    break;
                default:
                    return obj.name;
            }
        }
    });
    //----------------------------------------------------------------
    // КЛАДР для географии агента

    var $kladrForm = $('.js-form-kladr');

    $kladrForm.on('kladr1', addKladr);
    $kladrForm.trigger('kladr1');

    $('body').on('DOMNodeInserted', '.js-form-kladr__new-block', function() {
        var $newElem = $(this);
        var $kladerParent = $(this);
        $kladerParent.on('kladr1', addKladr);
        $kladerParent.trigger('kladr1');
    });

    function addKladr(evt){
        var $kladrHolder = $(this);
        var $kladrParent = $kladrHolder.closest('form');

        var $kladrEls = $kladrHolder.find("input[data-kladr-type]");
        var $cityEls = $kladrEls.filter('[data-kladr-type=city]');
        var $streetEls = $kladrEls.filter('[data-kladr-type=street]');
        var $buildingEls = $kladrEls.filter('[data-kladr-type=building]');

        $kladrEls.on('focusin', preventSubmit);
        $kladrEls.on('focusout', normalSubmit);

        $cityEls.kladr({
            parentInput: $kladrParent,
            type: $.kladr.type.city
        });
        $streetEls.kladr({
            parentInput: $kladrParent,
            type: $.kladr.type.street
        });
        $buildingEls.kladr({
            parentInput: $kladrParent,
            type: $.kladr.type.building
        });


        // varifyKladrEls($cityEls);
        // varifyKladrEls($streetEls);
        // varifyKladrEls($buildingEls);

        function preventSubmit(evt){
            var $form = $(this).closest('form');

            $form.on('keydown', function(event){
                if(event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        };

        function normalSubmit(evt){
            var $form = $(this).closest('form');

            $form.off('keydown');
        }

        function varifyKladrEls($elems) {
            $elems.each(function(index, elem){
                var $elem = $(this);
                var kladrId = $elem.attr("data-kladr-id");

                if( typeof kladrId !== 'undefined' && kladrId.length ) {
                    $elem.kladr('controller').setValueById(kladrId);
                }
            });
        }
    }

    $kladrForm.on('submit', function (evt) {
        var $form = $(this);

        if ($form.valid()) {
            copyIds($form);
        }

        if ($form.valid()) {
            //console.log("Форма отправлена");
        } else {
            //console.log("Форма НЕ отправлена");
        }
        //return false;
    });


    function copyIds($form){
        $form.find('.js-kladr-form__for-copy').each(function(index, elem) {
            var $elem = $(elem);
            var $elemCopy = $elem.siblings('.js-kladr-form__copy');
            var klardVal = $elem.val();
            var kladrId = '';

            // hotfix для type building, за одно и для всех остальных
            if ($elem.attr('data-kladr-id') && klardVal.length) {
                kladrId = $elem.attr('data-kladr-id');
            }

            $elemCopy.val(kladrId);
        });
    }    
}