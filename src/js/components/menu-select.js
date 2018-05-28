export default function () {

  $('.menu-select__nav').on('change', function () {
    window.location.href = this.value;
  })
}