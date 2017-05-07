$("#file").fileinput();

$(document).on('ready', function() {
    $("#file").fileinput({
        showUpload: false,
        showCaption: false,
        allowedFileExtensions: ["gif", "jpg", "png", "bmp", "jpeg", "pdf", "webm"]
    });
});
