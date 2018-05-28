//import declOfNum from './utils';

export default function() {

	var  $basket = $('[data-block="basket"]');
	var  $addToBasket =  $('[data-block="add-to-basket"]');

	if ( !$basket.length && !$addToBasket.length) {
		return;
	}

	var $totalPrice = $basket.find('[data-role="basket__total-price"]');
	var $totalCount = $basket.find('[data-role="basket__total-count"]');
	var Cookies = window.Cookies;

	var $basketEmpty = $basket.find('[data-role="empty"]');
	var $basketList = $basket.find('[data-role="list"]');

	$basket.on('click', '[data-role="basket__delete"]', deleteHandle);
	$basket.on('input', 'input[type="number"]', changeHandle);
	$addToBasket.on('click', '[data-role="add-to-basket__add"]', addHandle);

	var subjectNames = ['услуга', 'услуги', 'услуг'];

	updateBasketView();


	function deleteHandle(evt) {

		var $target = $(evt.currentTarget);
		var $elem   = $target.parents('[data-role="basket__elem"]');
		var id      = $elem.data('elem-id');

		delBasketById(id);

		updateBasketView();
	}


	function addHandle(evt) {

		evt.preventDefault();

		var $target = $(evt.currentTarget);
		var $elem   = $target.parents('[data-block="add-to-basket"]');
		var id      = $elem.data('elem-id');
		var name    = $elem.find('[data-role="name"]').text().trim();
		var price   = $elem.data('elem-price');

		addBasketById(id, name, price);

		updateBasketView();
	}


	function changeHandle(evt) {

		evt.preventDefault();

		var $target = $(evt.currentTarget);
		var $elem   = $target.parents('[data-role="basket__elem"]');
		var id      = $elem.data('elem-id');
		var name    = $elem.find('[data-role="name"]').text().trim();
		var price   = $elem.find('[data-role="price"]').text().trim();
		var count   = $elem.find('[data-role="basket__count"]').val();

		changeBasketById(id, name, price, count);

		updateBasketTotalPrice();
	}


	function updateBasketView(){
		var bJSON = Cookies.getJSON('basket') || {};
		var html  = '';
		var totalCount = 0;
		var subjectName = '';
		var totalPrice = calcTotalPrice();

		if ( typeof bJSON === "underfined" || !Object.keys(bJSON).length ) {
			$totalCount.text(`Заказано ${totalCount} услуг`).hide();
			$basketEmpty.show();
			$basketList.html(html).hide();
			return;
		} 

		for ( var key in bJSON ) {
			totalCount ++;

			html += `<tr class="aside-basket__tr" data-role="basket__elem" data-elem-id="${bJSON[key].id}">
                    <td class="aside-basket__td aside-basket__td--title">
                        <span data-role="name">${bJSON[key].name}</span>
                        <input type="hidden" name="service[id]" value="${bJSON[key].id}" />
                    </td>
                    <td class="aside-basket__td aside-basket__td--fix">
                        <input type="number" name="service[count]" value='${bJSON[key].count}' step="1" min="1" class="input input--small input--fill input--no-ellipsis aside-basket__count" data-role="basket__count">
                    </td>
                    <td class="aside-basket__td aside-basket__td--fix1 aside-basket__td--fix">
                        <span class="aside-basket__cost js-aside-basket__cost" data-role="price">${bJSON[key].price}</span> <br/> Руб</div>
                    <td class="aside-basket__td aside-basket__td--fix">
                        <span class="aside-basket__delete" data-role="basket__delete"><i class="aside-basket__delete-space"></i></span>
                    </td>
                </tr>`;
		}

		html += `<tr class="aside-basket__tr">
                    <td class="aside-basket__td aside-basket__td--title">
                        <div class="aside-basket__total">Итого</div>
                    </td>
                    <td class="aside-basket__td" colspan="3">
                        <span class="aside-basket__total js-aside-basket__total" data-role="basket__total-price">${totalPrice}</span>
                        <span class="aside-basket__total-rub">руб.</span>
                    </td>
                </tr>`;

		//subjectName = declOfNum(totalCount, subjectNames);

		$totalCount.text(`Заказано ${totalCount} услуг`).show();
		$basketEmpty.hide();
		$basketList.html(html).show();

	}

	function getBasketJson() {
		return Cookies.getJSON('basket');
	}

	function delBasketById(id) {

		var bJSON = Cookies.getJSON('basket') || {};

		if ( typeof bJSON === "undefined" || !Object.keys(bJSON).length ) {
			return;
		}

		delete(bJSON[id]);

		Cookies.set('basket', bJSON);
	}
	

	function addBasketById(id, name, price) {

		var bJSON = Cookies.getJSON('basket') || {};

		if ( typeof bJSON[id] !== "undefined" ) {
			bJSON[id].count = parseInt(bJSON[id].count) + 1;
		} else {
			bJSON[id] = { id: id, name: name, count: 1, price: price };
		}

		Cookies.set('basket', bJSON);
	}

	function calcTotalPrice() {
		var bJSON = Cookies.getJSON('basket') || {};
		var bJSONCount = Object.keys(bJSON).length;
		var totalPrice = 0;

		if ( typeof bJSON === "underfined" || !bJSONCount ) {
			return totalPrice;
		}

		for ( var key in bJSON ) {
			totalPrice += parseInt(bJSON[key].count) * parseFloat(bJSON[key].price);
		}

		return totalPrice.toFixed();

	}

	function changeBasketById(id, name, price, count) {
		var bJSON = Cookies.getJSON('basket') || {};

		bJSON[id] = { id: id, name: name, count: count, price: price };

		Cookies.set('basket', bJSON);
	}

	function updateBasketTotalPrice() {
		var totalPrice = calcTotalPrice();

		$basket.find('[data-role="basket__total-price"]').text(totalPrice);
	}



}