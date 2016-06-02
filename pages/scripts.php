<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
<script>
    $("#back-to-top-button").click(function() {
        $('html,body').animate({scrollTop: $("body").offset().top},'slow');
    });
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    function restore_image(){
        $(this).parent().children(".nya-image").show();
        $(this).remove();

    }
    $(".nya-image").click(function(){
        var img = $(this).data('image');
        var full = '<img src="'+img+'" class="img-responsive nya-image-full" />';
        var tag = $(full);
        tag.on("click", restore_image);
        $(this).hide();
        $(this).parent().append(tag);

    });
</script>
