$(document).ready( function() {

  $( function() {
    $( "#draggable" ).draggable();
  });


});
$(document).ready( function() {
  $("#draggable").hover( function() {
          $(this).css('color', 'white');
  },
  function() {
          $(this).css('color', 'red');
  });
});
