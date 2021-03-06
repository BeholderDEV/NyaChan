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

function restoreImage () {
  $(this).parent().children('.some-image').show()
  $(this).remove()
}
function toggle (obj) {
  var img = obj.data('full')
  var nam = obj.data('name')
  var full = '<img src="' + img + '" class="img-responsive"/>'
  $('#image-name').empty()
  $('#image-name').append(nam)
  $('#carousel-modal').empty()
  $('#carousel-modal').append(full)
  $('#showImageModal').on('show.bs.modal', function () {
         $(this).find('.modal-body').css({
                width:'auto', //probably not needed
                height:'auto', //probably not needed
                'max-height':'100%'
         });
  });
  $('#showImageModal').modal('show')
}

$(document).ready(function () {
  $('#selectTags').multiselect()
})

$(document).ready(function () {
  $('#changeTags').multiselect({
      nonSelectedText: 'Change Tags',
      onDropdownHidden: function(event) {
          var selectedOptions = $('#changeTags option:selected');
          if(selectedOptions.length != 0){
            var arrSelected = [];
            selectedOptions.each(function(){
               arrSelected.push($(this).val());
            });
            var scope = angular.element(document.getElementById("body")).scope();
            scope.$apply(function () {
              scope.changeTags(arrSelected);
            })
          }
      }
  });
})

$('#newThreadButton').click(function () {
  var actualTag = $('#tagTitle').attr('value')
  $('#selectTags').multiselect('select', [actualTag])
})
