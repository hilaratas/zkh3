export default function() {
    /**
     * Добавляет функционал выбора карточки
     *
     * @param cardsParent {string} селектор блока с карточками
     */
    class ShadowCard {
        constructor(cardsParent) {
            this._cardsParent = cardsParent;

            const cards = document.querySelectorAll(this._cardsParent + ' .shadow-card__content');

            Array.prototype.slice.call(cards).forEach(currentElem => {
                currentElem.addEventListener('click', () => {
                    this._removeAllCheckedCards();
                });

                currentElem.addEventListener('click', (evt) => {
                    let cardElem = evt.target.closest('.shadow-card__content');
                    ShadowCard._setCheckedCard(cardElem);
                });
            });

            const firstCard = document.querySelector(this._cardsParent + ' .shadow-card__content');
            firstCard.classList.add(ShadowCard.CHECKED_CLASS);
        }

        static get CHECKED_CLASS() {
            return 'checked';
        }

        static _setCheckedCard(target) {
            target.classList.add(ShadowCard.CHECKED_CLASS);
        }

        _removeAllCheckedCards() {
            const checkedCards = document.querySelectorAll(this._cardsParent + ' .shadow-card__content.checked');

            Array.prototype.slice.call(checkedCards).forEach((elem) => {
                elem.classList.remove(ShadowCard.CHECKED_CLASS);
            });
        }
    }


    /**
     * Расширяет ShadowCard, добавляя функционал переключения радио-инпутов
     *
     * Для работы у инпотов должен быть атрибут data-name="",
     * а у карточки (.shadow-card__content) должен быть соответствующий инпуту атрибут data-radio="blank"
     *
     * @param cardsParent {string} селектор блока с карточками
     * @param radioParent {string} селектор блока с радиокнопками
     */
    class RadioShadowCard extends ShadowCard {
        constructor(cardsParent) {
            super(cardsParent);

            const cards = document.querySelectorAll(this._cardsParent + ' .shadow-card__content');

            Array.prototype.slice.call(cards).forEach(currentElem => {
                currentElem.addEventListener('click', evt => {
                    RadioShadowCard._clickHandler(evt);
                });
            });

            const firstRadio = document.querySelector('[data-name]');
            firstRadio.setAttribute('checked', 'true');
        }

        static _clickHandler(evt) {
            RadioShadowCard._removeAllCheckedRadio();

            let cardElem = evt.target.closest('.shadow-card__content');
            RadioShadowCard._setCheckedRadio(cardElem.getAttribute('data-radio'));
        }

        static _setCheckedRadio(attr) {
            const radioTarget = document.querySelector('[data-name="' + attr + '"]');
            radioTarget.setAttribute('checked', 'true');

        }

        static _removeAllCheckedRadio() {
            const checkedRadio = document.querySelectorAll('[data-name]');

            Array.prototype.slice.call(checkedRadio).forEach((elem) => {
                elem.removeAttribute('checked');
            });
        }
    }

    const startElement = document.querySelector('.js-card-radio-btns');
    if (startElement) {
        new RadioShadowCard('.js-card-radio-btns');
    }
}