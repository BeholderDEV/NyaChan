$('body').on('click', '.panel-body .OP', function(){
  
});

$('body').on('click', '.panel-footer .post-image', function(){
  if($(this).attr('data-is-full')=='0'){
    $(this).attr('src',$(this).attr('data-full'));
    $(this).attr('data-is-full',1);    
  }else{
    $(this).attr('src',$(this).attr('data-thumb'));
    $(this).attr('data-is-full',0);
  }
  
});

$(document).ready(function() {
  $('#selectTags').multiselect();  
});

$("#newThreadButton").click(function(){
  var actualTag = $("#tagTitle").attr("value");
  $('#selectTags').multiselect('select', [actualTag]); 
});