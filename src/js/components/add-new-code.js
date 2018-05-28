export default function() {
	function addNewCode(options) {

		const self = this;

		self.addHandle = function(evt) {
			let $this = $(this);
			let $holder = options.$placeholder;
			let template = options.template;
			let next = $holder.data('next');
			let $template = self.parseTemplate(template, next);

			self.append({template: $template, holder: $holder});
			self.setNewCount(next + 1);
		}

		self.setNewCount = function(newVal) {
			let $holder = options.$placeholder;
			$holder.data('next', newVal);
		}

		self.removeHandle = function(evt) {
			let $rmEl = $(evt.target);
			$rmEl.closest(options.elemSelector).remove();
		}

		self.bindHandles = function() {
			let $holder = options.$placeholder;
			options.$addCtls.on('click', self.addHandle);
			$holder.on('click', options.rmElemSelectors, self.removeHandle);
		}

		self.append = function (opt) {
			let $holder = opt.holder;
			let $template = opt.template;

			$holder.append($template);
			$template.trigger('added.newCode');
		}

		self.parseTemplate = function(template, next) {
			var tpl = template;
			tpl = tpl.replace(/%next%/g, next);
			return $(tpl);
		}

		self.init = function() {
			this.bindHandles();
		}
	}

	var opt = {
		$placeholder: $('#js-geo-placeholder'),
		template: window.agentNewGeo,
		$addCtls: $('#js-geo-add'),
		elemSelector: '.js-geo-elem',
		rmElemSelectors: '.js-geo-remove'
	}

	if( opt.$placeholder.length && opt.template.length && opt.$addCtls.length) {
		let geo = new addNewCode(opt);
		geo.init();
	}

	//Редактирование кабинета - добавление лицевого счета
	var optLc = {
		$placeholder: $('#js-lc-data'),
		template: window.newLcTemplate,
		$addCtls: $('#js-lc-data__add'),
		elemSelector: '.js-lc-data__context',
		rmElemSelectors: '.js-lc-data__remove'
	}

	if( optLc.$placeholder.length && optLc.template.length && optLc.$addCtls.length) {
		let lc = new addNewCode(optLc);
		lc.init();
	}
}