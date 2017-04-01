$('body').on('click', '.panel-body .OP', function(){
  $(this).toggleClass('image-thumb-OP');
});

$('body').on('click', '.panel-footer .post-image', function(){
  $(this).toggleClass('image-thumb');
});
$(document).ready(function() {
  $('#selectTags').multiselect();  
});
$("newThreadButton").click(function(){
  var actualTag = $("#tagTitle").val();
  console.log(actualTag);
  $('#selectTags').multiselect('select', [actualTag]); 
});