export default function() {

	let hToddlers = document.querySelectorAll('.js-toddler');

	for (let i = 0; i < hToddlers.length; i++ ) {
		let hToddler = hToddlers[i];
		let hTslider = hToddler.querySelector('.js-toddler__slider');
		let hTvalue = hToddler.querySelector('.js-toddler__value');
		let min = parseInt(hTslider.getAttribute('data-min'));
		let max = parseInt(hTslider.getAttribute('data-max'));
		let step = parseInt(hTslider.getAttribute('data-step'));

		noUiSlider.create(hTslider, {
			start: [0],
			connect: true,
			format: {
			  to: function ( value ) {
				return (value/1).toFixed(0);
			  },
			  from: function ( value ) {
				return value;
			  }
			},
			snap: true,
			tooltips: [true],
			range: {
				'min': [ min ],
				'50%': [ 500000 ],
				'max': [ max ]
			},
			step: step
		});

		hTslider.noUiSlider.on('update', function( values, handle ) {
			hTvalue.value = values[handle];
			$(hTvalue).trigger('update');
		});
	}
}