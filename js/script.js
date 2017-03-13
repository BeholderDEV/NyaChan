$('body').on('click', '.panel-body .OP', function(){
    $(this).toggleClass('image-thumb-OP');
});

$('body').on('click', '.panel-footer .post-image', function(){
    $(this).toggleClass('image-thumb');
});

$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='comment-form']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      comment: "required"
    },
    // Specify validation error messages
    messages: {
      comment: "Please enter a comment"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});