$('body').on('click', '.panel-body .OP', function(){
  $(this).toggleClass('image-thumb-OP');
});

$('body').on('click', '.panel-footer .post-image', function(){
  $(this).toggleClass('image-thumb');
});
$(document).ready(function() {
  $('#selectTags').multiselect();
  var actualTag = $("#tagTitle").val();
  $("option").each(function() {
    if(this.attr("value")==actualTag){
      console.log("tag: "+this.val);
      this.attr("selected","selected");
    }
  });
});
