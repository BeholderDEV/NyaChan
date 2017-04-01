$('body').on('click', '.panel-body .OP', function(){
  $(this).toggleClass('image-thumb-OP');
});

$('body').on('click', '.panel-footer .post-image', function(){
  $(this).toggleClass('image-thumb');
});
$(document).ready(function() {
  $('#selectTags').multiselect();
  var actualTag = $("#tagTitle").val();
  $('#selectTags').multiselect('select', [actualTag]); 
});
