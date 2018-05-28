;(function($) {
  $.fn.tabs = function(options) {

    return this.each(function() {

      var $this = $(this),
          $btns = $this.find('.js-tab__switcher'),
          $pages = $this.find('.js-tab__page');

      //Сделаем активной первую кнопку
      $btns.first().addClass('is-active');

      //Скроем все страницы кроме первой
      $pages.not(':first').addClass('is-inactive');

      //клик по кнопкам
      $btns.each(function(btnIndex, ele){
          $(ele).on('click', {index: btnIndex}, function(event){
            event.preventDefault();
            var $this = $(this),
                btnIndex = event.data.index,
                $selectPage = $pages.eq(btnIndex),
                isSelectPage = !!$selectPage.length,
                isBtnActive = !$this.hasClass('active');

            if (isSelectPage) {
              if (isBtnActive) {
                $btns.removeClass('is-active');
                $this.addClass('is-active');
                $pages.removeClass('is-active').addClass('is-inactive');
                $selectPage.removeClass('is-inactive').addClass('is-active');
              }
            } else {
              alert('Страница не найдена!');
            }
          });
      });
    });

  };
})(jQuery);