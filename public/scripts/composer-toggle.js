// make new-tweet section slide up or down when click the Compose button
$(() => {
  var $toggle = $('#nav-bar button');
  $toggle.on('click', () => {
    $('section.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });

});