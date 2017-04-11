// $('body').on('click', '.some-image', function(){
//   if($(this).attr('data-is-full')=='0'){
//     $(this).attr('src',$(this).attr('data-full'));
//     $(this).attr('data-is-full',1);
//   }else{
//     $(this).attr('src',$(this).attr('data-thumb'));
//     $(this).attr('data-is-full',0);
//   }
//
// });
function restore_image(){
    $(this).parent().children(".nya-image").show();
    $(this).remove();

}
$(".some-image").click(function(){
    var img = $(this).data('data-full');
    var full = '<img src="'+img+'" class="img-responsive nya-image-full" />';
    var tag = $(full);
    tag.on("click", restore_image);
    $(this).hide();
    $(this).parent().append(tag);

});

$(document).ready(function() {
  $('#selectTags').multiselect();
});

$("#newThreadButton").click(function(){
  var actualTag = $("#tagTitle").attr("value");
  $('#selectTags').multiselect('select', [actualTag]);
});
