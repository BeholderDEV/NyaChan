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
    $(this).parent().children(".some-image").show();
    $(this).remove();
    alert('aqui')
}
$(".some-image").click(function(){
    var img = $(this).data('full');
    var full = '<img src="'+img+'" class="img-responsive nya-image-full" alt="loading"/>';
    var tag = $(full);
    $(tag).on("click", restore_image);
    var w =  $(this).attr('width');
    $(tag).attr('width', $(this).data('width'));
    $(tag).data('width', w);
    var h =  $(this).attr('height');
    $(tag).attr('height', $(this).data('height'));
    $(tag).data('height', h);
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
