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
function toggle(obj){
    var img = obj.data('full');
    var full = '<img src="'+img+'" class="img-responsive"/>';
    var tag = $(full);
    $(tag).on("click", restore_image);
    var w =  obj.attr('width');
    $(tag).attr('width', obj.data('width'));
    $(tag).data('width', w);
    var h =  obj.attr('height');
    $(tag).attr('height', obj.data('height'));
    $(tag).data('height', h);
    obj.hide();
    obj.parent().append(tag);

}

$(document).ready(function() {
  $('#selectTags').multiselect();
});

$("#newThreadButton").click(function(){
  var actualTag = $("#tagTitle").attr("value");
  $('#selectTags').multiselect('select', [actualTag]);
});
