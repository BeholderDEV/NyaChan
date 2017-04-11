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
$(".some-image").click(function(){
    var img = $(this).attr('src');
    $(this).attr('src', $(this).data('full'));
    $(this).data('image', img);
    var w =  $(this).attr('width');
    $(this).attr('width', $(this).data('width'));
    $(this).data('width', w);
    var h =  $(this).attr('height');
    $(this).attr('height', $(this).data('height'));
    $(this).data('height', h);
});
// function restore_image(){
//     $(this).parent().children(".some-image").show();
//     $(this).remove();
//
// }
// $(".some-image").click(function(){
//     var img = $(this).data('full');
//     var full = '<img src="'+img+'" class="img-responsive nya-image-full" />';
//     var tag = $(full);
//     tag.on("click", restore_image);
//     $(this).hide();
//     $(this).parent().append(tag);
//
// });

$(document).ready(function() {
  $('#selectTags').multiselect();
});

$("#newThreadButton").click(function(){
  var actualTag = $("#tagTitle").attr("value");
  $('#selectTags').multiselect('select', [actualTag]);
});
