$('body').on('click', '.panel-body .OP', function(){
    $(this).toggleClass('image-thumb-OP');
});

$('body').on('click', '.panel-footer .post-image', function(){
    $(this).toggleClass('image-thumb');
});

$('#newThreadModal').on('shown.bs.modal', function (e) {
  $(this).find('form').validator()
  $('#newThreadModal').on('hidden.bs.modal', function (e) {
    $(this).find('form').off('submit').validator('destroy')
  })
})